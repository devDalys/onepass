export const delay = (time: number) => {
  return new Promise((res) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      res(null);
    }, time);
  });
};
