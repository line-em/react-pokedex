import './Header.css'
import {useEffect, useState} from "react";
import {getLogo} from "../../api/getLogo.js";

const Header = () => {
    const [banner, setBanner] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const banner = await getLogo()
                setBanner(banner)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        void fetchData();
    }, []);
    return <header>
        {banner && <img src={banner} alt="Eevee"/>}
        <a href="/" style={{textDecoration: "none"}}><h1>React Pokedex</h1></a>
        <ul>
            <li>
                <a href="https://github.com/line-em/react-pokedex" target="_blank">
                    Github
                </a>
            </li>
            <li>
                <a href="https://pokeapi.co/" target="_blank">
                    PokeAPI
                </a>
            </li>
        </ul>
    </header>;
}
export default Header