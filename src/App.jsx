import React, {useEffect, useState} from 'react';
import './App.module.css';
import Loading from './components/Loading/Loading.jsx';
import {
    DEFAULT_URL,
    getPokemonByType,
    getPokemonData,
    getPokemons
} from './api/getPokemon.js';
import Header from './components/Header/Header.jsx';
import PokeCard from "./components/PokeCard/PokeCard.jsx";
import Nav from "./components/Nav/Nav.jsx";
import styles from './App.module.css'
import PokemonTypes from "./components/Search/PokemonTypes.jsx";

function App() {
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState([]);
    const [next, setNext] = useState('');
    const [prev, setPrev] = useState('');
    const [currentUrl, setCurrentUrl] = useState(DEFAULT_URL);

    useEffect(() => {
        const timeout = setTimeout(() => {
            void fetchData(currentUrl);
        }, 250);
        return () => clearTimeout(timeout);
    }, [currentUrl]);

    const fetchData = async (url) => {
        try {
            const pokeList = await getPokemons(url);
            const hasPagination = pokeList.next
            if (hasPagination) {
                setNext(pokeList.next);
                setPrev(pokeList.previous);
                const pokeListWithDetails = await getPokemonDetails(pokeList.results);
                setPokemon(pokeListWithDetails);
            } else {
                const pokemonByType = pokeList?.pokemon?.map((pokemon) => pokemon?.pokemon?.name)
                let pokeListWithDetails = await Promise.all(pokemonByType.map((pokemon) => getPokemonData(pokemon)));
                setNext("");
                setPrev("");
                setPokemon(pokeListWithDetails.map(details => ({details})));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getPokemonDetails = async (pokemonList) => {
        return await Promise.all(pokemonList.map(async (poke) => {
            const details = await getPokemonData(poke.name);
            return {...poke, details};
        }));
    };

    const filterPokemon = (type) => {
        setLoading(true);
        setCurrentUrl(type === 'reset' ? DEFAULT_URL : getPokemonByType(type));
    }

    const switchPage = (direction) => {
        setLoading(true);
        setCurrentUrl(direction);
    };

    return (
        <main>
            <Header/>
            <section className={styles.section}>
                <PokemonTypes filterPokemon={filterPokemon}/>
                <ul className="poke-grid">
                    {!loading && pokemon && pokemon?.map((poke, i) => (
                        <PokeCard pokeData={poke} key={poke?.details.name + i}/>
                    ))}
                </ul>
                {loading && <Loading/>}
                <Nav prev={prev} next={next} func={switchPage}/>
            </section>
        </main>
    );
}

export default App;
