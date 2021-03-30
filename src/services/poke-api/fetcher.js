export const baseUrl = "https://pokeapi.co/api/v2/";
const fetcher = (url) => fetch(`${baseUrl}${url}`).then((res) => res.json());

export default fetcher;
