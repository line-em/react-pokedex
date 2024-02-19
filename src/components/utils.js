import {typePalette} from "../data/typePalette.js";

export const findColor = (refColor) => {
    const color = typePalette.find((palette) => palette.name === refColor);
    return color?.color || "var(--rose-5)";
}

export const capitalize = (name) => {
    const words = name.split("-");
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export const pokedexEntry = (id) => {
    if (id < 10) return `#00${id}`;
    else if (id >= 10 && id < 99) return `#0${id}`;
    else return `#${id}`;
};