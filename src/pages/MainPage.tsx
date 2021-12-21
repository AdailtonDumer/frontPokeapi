import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { PokemonType } from "../types/types";
const headerImg = require('../assets/headerImg.png')


export function MainPage() {
    const [pokemonList, setPokemonList] = useState<PokemonType[]>([])
    async function getAll(){
        const list = await api.get('pokemon').then(res => res.data as PokemonType[]);
        setPokemonList(list);
    }

    useEffect(() => {
        getAll();
    }, []);

    return (
        <>
            <div className="subHeader">
                <h1>Pokémon</h1>
                <Link to='/new' className="btn">
                    Novo
                </Link>
            </div>
            <hr />
            <div className="listCards">
                {
                    pokemonList.map((pokemon, i) => {
                        return (
                            <Link key={i} className="btn" to={`/new/${pokemon.id}`}>
                                <img src={pokemon.dataImage || headerImg} alt={pokemon.name || 'Pokemon'} className="image"/>
                                <hr />
                                <div className="card-title">
                                    <p>{pokemon.name}</p>
                                </div>
                                <hr />
                            </Link>

                        )
                    })
                }
            </div>
        </>
    );
}