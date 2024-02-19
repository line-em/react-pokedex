import styles from './search.module.css'
import TypePillBox from "../TypePillBox/TypePillBox.jsx";
import {allPokemonTypes} from "../../data/types.js";
import TypePill from "../TypePill/TypePill.jsx";
import {useState} from "react";

const PokemonTypes = ({filterPokemon}) => {
    const [selected, setSelected] = useState("reset")

    const handleSelected = (type) => {
        setSelected(type)
        filterPokemon(type)
    }

    return (<section className={styles.searchBox}>
        <TypePillBox bigger>
            {(selected !== "reset") &&
                <TypePill type={"Reset"} selected={"reset" === selected}
                          interactive onClick={() => handleSelected("reset")}/>}
            {allPokemonTypes.map((type, i) => <TypePill type={type} key={type + i}
                                                        selected={type === selected}
                                                        interactive
                                                        onClick={() => handleSelected(type)}/>)}
        </TypePillBox>
    </section>)
}
export default PokemonTypes