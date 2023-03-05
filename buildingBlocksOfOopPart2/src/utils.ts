export const transformNumberToString = (number: number): string => {
  const roundedNumberInteger = Math.floor(number);
  const numberDivisionRemainder = Math.round((number % roundedNumberInteger) * 100) ;
  const numberDivisionRemainderString = numberDivisionRemainder ? `${numberDivisionRemainder}` : "00";
  const numberString = `${roundedNumberInteger}.${numberDivisionRemainderString}`;

  return numberString;
};