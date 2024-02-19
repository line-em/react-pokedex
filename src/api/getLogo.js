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

export const getLogo = async () => {
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