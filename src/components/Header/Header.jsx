import './Header.css'
import {useEffect, useState} from "react";
import {fetchPokeBanner} from "../../api/getPokemon.js";

const Header = () => {
    const [banner, setBanner] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const banner = await fetchPokeBanner()
                setBanner(banner)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        void fetchData();
    }, []);
    return <header>
        {banner && <img src={banner} alt="Eevee"/>}
        <h1>React Pokedex</h1>
        <ul>
            <li>
                <a href="https://react.dev" target="_blank">
                    Github
                </a>
            </li>
            <li>
                <a href="https://react.dev" target="_blank">
                    PokeAPI
                </a>
            </li>
        </ul>
    </header>;
}
export default Header