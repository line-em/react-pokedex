import styles from './typepill.module.css'
import {capitalize, findColor} from "../utils.js";

const TypePill = ({type, selected = false, interactive = false, onClick}) => {
    return (
        <div
            className={`${styles.pill} ${interactive && styles.interactive} ${selected && styles.selected}`}
            style={{
                backgroundColor: findColor(type)
            }} onClick={onClick && onClick}>{capitalize(type)}</div>
    )
}
export default TypePill
