export const numberWithCommas = (x: string | number) => {
  return parseFloat(x.toString())
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getAccessToken = () => {
  return localStorage.getItem("id_token");
}
