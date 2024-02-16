import styles from './search.module.css'
import {useState} from "react";

const Search = () => {
    const [query, setQuery] = useState("")

    const handleSearch = (e) => {
        e.preventDefault()
        console.log(query)
    }
    return (
        <section className={styles.searchBox}>
            <label htmlFor="pokesearch">Search</label>
            <input type="text" id={"pokesearch"}
                   onChange={(e) => setQuery(e.target.value)} value={query}/>
            <button onClick={(e) => handleSearch(e)}>Search</button>
        </section>)
}
export default Search
