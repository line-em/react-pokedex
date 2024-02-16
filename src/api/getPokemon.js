export const getPokemons = async (url) => {
    let data;
    try {
        const res = await fetch(url)
        data = await res.json()
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const getPokemonData = async (pokemon) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    let data;
    try {
        const res = await fetch(URL)
        data = await res.json()
        return refineData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const refineData = async (data) => {
    return data !== null && {
        id: data.id,
        name: data.name,
        types: data.types,
        stats: data.stats,
        gif_shiny: data?.sprites?.versions["generation-v"]["black-white"]?.animated?.front_shiny,
        gif: data?.sprites?.versions["generation-v"]["black-white"]?.animated?.front_default,
        img: data?.sprites?.versions["generation-iv"]["heartgold-soulsilver"]?.front_default || data?.sprites?.front_default,
        img_shiny: data?.sprites?.versions["generation-iv"]["heartgold-soulsilver"]?.front_shiny || data?.sprites?.front_shiny,
    }
}

const randomEevee = () => {
    const eeveeEvolutions = [
        "jolteon",
        "flareon",
        "vaporeon",
        "espeon",
        "umbreon",
        "leafeon",
        "glaceon",
        "sylveon"
    ];
    return eeveeEvolutions[Math.floor(Math.random() * eeveeEvolutions.length)];
}

export const fetchPokeBanner = async () => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${randomEevee()}`
    let data;
    try {
        const res = await fetch(URL)
        data = await res.json()

        if (data && data?.sprites?.versions["generation-v"]["black-white"]?.animated) {
            return data?.sprites?.versions["generation-v"]["black-white"]?.animated?.front_shiny;
        } else {
            return data?.sprites?.front_shiny
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}