import styles from './nav.module.css'
const Nav = ({prev, next, func}) => {
    return (
        <nav className={styles.nav}>
            {prev && <button onClick={() => func(prev)}>Prev</button>}
            {next && <button onClick={() => func(next)}>Next</button>}
        </nav>)
}
export default Nav
