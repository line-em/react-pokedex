import React, {useEffect, useState} from 'react';
import './App.css';
import Loading from './components/Loading/Loading.jsx';
import {getPokemonData, getPokemons} from './api/getPokemon.js';
import Header from './components/Header/Header.jsx';
import {typePalette} from "./typePalette.js";

function App() {
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState([]);
    const [next, setNext] = useState('');
    const [prev, setPrev] = useState('');
    const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=24');

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchData(currentUrl);
        }, 300); // Simulate loading delay of 1 second

        return () => clearTimeout(timeout); // Clear timeout on component unmount

    }, [currentUrl]);

    const fetchData = async (url) => {
        console.log(url);
        try {
            const newPokeList = await getPokemons(url);
            setNext(newPokeList.next);
            setPrev(newPokeList.previous);
            const pokeListWithDetails = await fetchPokemonDetails(newPokeList.results);
            setPokemon(pokeListWithDetails);
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
            <section>
                <ul className="poke-grid">
                    {!loading && pokemon && pokemon.map((poke, i) => (
                        <li key={i} className={"poke-card"}
                            style={{
                                borderColor: typePalette.find((palette) => palette.name === poke.details.types[0].type.name).color,
                                backgroundColor: `${typePalette.find((palette) => palette.name === poke.details.types[0].type.name + "-alt").color}`
                            }}>
                            <section>
                                <h2
                                    style={{textDecoration: `underline ${typePalette.find((palette) => palette.name === poke.details.types[0].type.name).color} wavy`}}>{poke.name}</h2>
                                <p>type: {poke.details.types.map((type) => type.type.name)}</p>
                            </section>
                            <img src={poke.details.gif} alt=""/>
                        </li>
                    ))}
                </ul>
                {prev && <button onClick={() => switchPage(prev)}>Prev</button>}
                {next && <button onClick={() => switchPage(next)}>Next</button>}
                {loading && <Loading/>}

                <p>
                    This project was built
                    using <strong>Vite</strong>, <strong>React</strong>,
                    and <strong>PokeAPI.</strong>
                </p>
            </section>
        </main>
    );
}

export default App;
