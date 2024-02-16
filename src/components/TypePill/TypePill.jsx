import styles from './pill.module.css'
import {capitalize, findColor} from "../utils.js";

const TypePill = ({type}) => {
    return (
        <div className={styles.pill}  style={{
            backgroundColor: findColor(type)
        }}>{capitalize(type)}</div>
    )
}
export default TypePill
