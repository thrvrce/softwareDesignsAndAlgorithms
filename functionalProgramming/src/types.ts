import { Maybe } from './fp/maybe';

export interface Point {
  x: number;
  y: number;
}

export interface User {
  name: string;
  position: Point;
}

export type ClientUserApi = User & {
  demands: Array<Demand> | null;
  reward: number;
}

export enum Demand {
  Driving = 'Driving',
  Fighting = 'Fighting',
  Fishing = 'Fishing'
}

export interface ClientUser extends User {
  demands: Maybe<Array<Demand>>;
  reward: number;
}

export interface ExecutorUser extends User {
  possibilities: Array<Demand>;
}

type WithDistance<T extends {position: Point}> = T & { distance: number }

export type ClientUserWithDistance = WithDistance<ClientUser>