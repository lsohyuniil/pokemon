import React, { useState, useEffect } from "react";
import { fetchPokemonData } from "../services/pokemonService";
import "./css/PokemonCard.css";
import PokemonTypeBadge from "./PokemonTypeBadge"

function PokemonCard ({ index }) {
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
    async function fetchData() {
        try {
        const pokemonData = await fetchPokemonData(index);
        setPokemonData(pokemonData);
    } catch (error) {
        console.error("포켓몬 데이터를 가져오는 데 실패했습니다:", error);
        }
    }

    fetchData();

    }, [index]); 

    // pokemonData가 아직 로드되지 않았을 때
    if (!pokemonData) return <div></div>;

    return (
        <a className="pokemon-card" href={`/pokemon/${pokemonData.id}`}>
            <div className="pokemon-name-container">
                <span className="pokemon-id">No.{pokemonData.id}</span>
                <span className="pokemon-name">{pokemonData.koreanName}</span>
            </div>
            <img src={pokemonData.front_image} alt={pokemonData.id} className="pokemon-image"/>
            {/* <span className="pokemon-types">{pokemonData.translatedTypes.join(', ')}</span> */}
            <div className="pokemon-types">
                {pokemonData.translatedTypes.map((type) => (
                    <PokemonTypeBadge key={type} type={type} />
                ))}
            </div>
        </a>
    );
};

export default PokemonCard;



