import { Either, fromPromise, ap, right, getOrElse, flatten, left, isLeft } from './fp/either';
import { pipe } from './fp/utils';
import { fetchClient, fetchExecutor } from './fetching';
import { ClientUser, ExecutorUser, ClientUserApi, Point, ClientUserWithDistance } from './types';
import { map, sort } from './fp/array';
import { Maybe, fromNullable, isSome, isNone } from './fp/maybe';
import { fromCompare, ordNumber, revert } from './fp/ord';
import { setoidString } from './fp/setoid';
import { distance } from './utils';

type Response<R> = Promise<Either<string, R>>
type MaybeDemands<T extends {demands: unknown }> = T & {demands: Maybe<T['demands']>}

function mapDemands <A extends { demands: unknown }>(a: A): MaybeDemands<A> {
  return {...a, demands: fromNullable(a.demands)}
}

function mapDemandsListAsync <A extends { demands: unknown }>(demandsListPromise: Promise<A[]>): Promise<MaybeDemands<A>[]> {
  return demandsListPromise
  .then(demandsList => map(mapDemands)(demandsList))
  .catch(err => Promise.reject(err))
}

const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
const getClients = (): Response<Array<ClientUser>> => fromPromise(mapDemandsListAsync(fetchClient()));

export enum SortBy {
  distance = 'distance',
  reward = 'reward',
}

export const show = (sortBy: SortBy) => (clients: Array<ClientUser>) => (executor: ExecutorUser): Either<string, string> => {
  const clientsFilteredByDemand = clients.filter(({demands}) => isNone(demands) || demands.value.every(demand => executor.possibilities.includes(demand)))
  const isResultRight = clientsFilteredByDemand.length

  const getResultRight = () => {
    const isSortedByDistance = setoidString.equals(sortBy, SortBy.distance)
    const mapDistanceFn = map<ClientUser, ClientUserWithDistance>((client: ClientUser) => ({...client, distance: distance(executor.position, client.position)}))
    const clientUserSortComparator = isSortedByDistance
    ? fromCompare<ClientUserWithDistance>((clientA, clientB) => ordNumber.compare(clientA.distance, clientB.distance))
    : fromCompare<ClientUserWithDistance>((clientA, clientB) => revert(ordNumber).compare(clientA.reward, clientB.reward))
    const clientUserSortFn = sort(clientUserSortComparator)
    const mapClientStringFn = map(({name, distance, reward}: ClientUserWithDistance) => `\nname: ${name}, distance: ${distance}, reward: ${reward}`)
    const clientUsersWithDistance = mapDistanceFn(clientsFilteredByDemand)
    const sortedClientUsers = clientUserSortFn(clientUsersWithDistance)
    const clientsStringArr = mapClientStringFn(sortedClientUsers)
    const clientsStringContent = clientsStringArr.join('')

    const title = isResultRight
    ?  clientsFilteredByDemand.length === clients.length
      ? 'This executor meets all demands of all clients!\n'
      : `This executor meets the demands of only ${clientsFilteredByDemand.length} out of ${clients.length} clients\n\n`
    : ''
    const sortingTypeString = isSortedByDistance ? 'distance to executor' : 'highest reward';
    const subTitle = `Available clients sorted by ${sortingTypeString}:`

    return right(`${title}${subTitle}${clientsStringContent}`)
  }

  return isResultRight
    ? getResultRight()
    : left('This executor cannot meet the demands of any client!')
};

export const main = (sortBy: SortBy): Promise<string> => (
  Promise
    .all([getClients(), getExecutor()]) // Fetch clients and executor
    .then(([clients, executor]) => (
      pipe(
        /**
         * Since the "show" function takes two parameters, the value of which is inside Either
         * clients is Either<string, Array<Client>>, an executor is Either<string, Executor>. How to pass only Array<Client> and Executor to the show?
         * Either is an applicative type class, which means that we can apply each parameter by one
         */
        right(show(sortBy)), // Firstly, we need to lift our function to the Either
        ap(clients), // Apply first parameter
        ap(executor), // Apply second parameter
        flatten, // show at the end returns Either as well, so the result would be Either<string, Either<string, string>>. We need to flatten the result
        getOrElse((err) => err) // In case of any left (error) value, it would be stopped and show error. So, if clients or executor is left, the show would not be called, but onLeft in getOrElse would be called
      )
    ))
);
