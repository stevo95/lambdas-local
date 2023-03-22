const fetch = require('/opt/lambdas_example_npm_packages/nodejs/node_modules/node-fetch');

export const capitalize = (str: string): string => {
    return str.toUpperCase();
}

export const fetchPokemon = async () => {
    const result = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
    return await result.json();
}