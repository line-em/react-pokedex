export const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon/?limit=20"

export const getPokemons = async (url) => {
    try {
        const res = await fetch(url)
        return await res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const getPokemonData = async (pokemon) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    try {
        const res = await fetch(URL)
        const data = await res.json()
        return refineData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const getPokemonByType = (type) => {
    return `https://pokeapi.co/api/v2/type/${type}`;
}

const refineData = async (data) => {
    return data !== null && {
        id: data.id,
        name: data.name,
        types: data.types,
        stats: data.stats,
        gif_shiny: data?.sprites?.versions["generation-v"]["black-white"]?.animated?.front_shiny || data?.sprites?.front_default,
        gif: data?.sprites?.versions["generation-v"]["black-white"]?.animated?.front_default || data?.sprites?.front_default,
        img: data?.sprites?.other["official-artwork"].front_default || data?.sprites?.front_default,
        img_shiny: data?.sprites?.front_shiny,
    }
}
