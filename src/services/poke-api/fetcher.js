const baseUrl = 'https://pokeapi.co/api/v2/';

export default (url) => fetch(`${baseUrl}${url}`).then((res) => res.json());
