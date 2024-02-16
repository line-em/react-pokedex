import styles from './pokecard.module.css'
import {capitalize, findColor, pokedexEntry} from "../utils.js";
import TypePill from "../TypePill/TypePill.jsx";
import {useId} from "react";

const PokeCard = ({pokeData}) => {
    const pokeType = pokeData?.details?.types[0]?.type?.name;
    return (
        <li className={styles.pokeCard}
            style={{
                borderColor: findColor(pokeType),
                backgroundColor: findColor(pokeType + "-alt")
            }}>
            <div className={styles.bgImage}>
                <img src={pokeData.details.img} style={{width: "200px"}} aria-hidden
                     alt="background decoration"/>
            </div>

            <section className={styles.content}>
                <sub className={styles.pokedex}>{pokedexEntry(pokeData.details.id)}</sub>
                <h2
                    className={styles.pokeName}
                    style={{textDecorationColor: findColor(pokeType)}}>
                    {capitalize(pokeData?.name)}
                </h2>
                <p className={styles.pillBox}>{pokeData?.details.types.map((type) =>
                    <TypePill
                        type={type.type.name} key={type.type.name + pokeData.name}/>)}</p>
            </section>
            <img src={pokeData?.details.gif} alt={pokeData.name}/>
        </li>
    )
}
export default PokeCard
