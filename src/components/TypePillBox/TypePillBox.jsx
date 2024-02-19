import styles from './typepillbox.module.css'

const TypePillBox = ({bigger = false, children}) => {
    return (
        <div className={`${styles.pillBox} ${bigger && styles.bigger}`}>
            {children}
        </div>)
}
export default TypePillBox
