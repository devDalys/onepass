export const getEndWord = (count: number, variables: [string, string, string]) => {
  const toWord = count.toString();
  const lastNumber = +toWord[toWord.length - 1];
  if (lastNumber === 1) return variables[0];
  if (lastNumber >= 5 || lastNumber === 0) return variables[1];
  if (lastNumber < 5) return variables[2];
};
