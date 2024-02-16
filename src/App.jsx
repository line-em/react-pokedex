import React, {useEffect, useState} from 'react';
import './App.module.css';
import Loading from './components/Loading/Loading.jsx';
import {getPokemonData, getPokemons} from './api/getPokemon.js';
import Header from './components/Header/Header.jsx';
import PokeCard from "./components/PokeCard/PokeCard.jsx";
import Nav from "./components/Nav/Nav.jsx";
import styles from './App.module.css'
import Search from "./components/Header/Search/Search.jsx";

function App() {
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState([]);
    const [next, setNext] = useState('');
    const [prev, setPrev] = useState('');
    const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=20');

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchData(currentUrl);
        }, 300); // Simulate loading delay of 1 second

        return () => clearTimeout(timeout); // Clear timeout on component unmount

    }, [currentUrl]);

    const fetchData = async (url) => {
        try {
            const newPokeList = await getPokemons(url);
            setNext(newPokeList.next);
            setPrev(newPokeList.previous);
            const pokeListWithDetails = await fetchPokemonDetails(newPokeList.results);
            setPokemon(pokeListWithDetails);
            console.log(newPokeList)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPokemonDetails = async (pokemonList) => {
        return await Promise.all(pokemonList.map(async (poke) => {
            const details = await getPokemonData(poke.name);
            return {...poke, details};
        }));
    };

    const switchPage = (direction) => {
        setLoading(true);
        setCurrentUrl(direction);
    };

    return (
        <main>
            <Header/>
            <section className={styles.section}>
                <Search/>
                <ul className="poke-grid">
                    {!loading && pokemon && pokemon.map((poke, i) => (
                        <PokeCard pokeData={poke} key={poke?.name + i}/>
                    ))}
                </ul>
                {loading && <Loading/>}
                <Nav prev={prev} next={next} func={switchPage}/>

            </section>
        </main>
    );
}

export default App;
