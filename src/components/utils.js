import {typePalette} from "../typePalette.js";

export const findColor = (refColor) => typePalette.find((palette) => palette.name === refColor).color
export const capitalize = (word) => word[0].toUpperCase() + word.slice(1)
export const pokedexEntry = (id) => {
    if (id < 10) return `#00${id}`;
    else if (id >= 10 && id < 99) return `#0${id}`;
    else return `#${id}`;
};