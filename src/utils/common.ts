export const numberWithCommas = (x: string | number) => {
  return parseFloat(x.toString())
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
