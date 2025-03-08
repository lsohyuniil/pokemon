import React from "react";
import "../icons/style.css";
import { typeTranslations, typeIcons } from "../utils/types";

function PokemonTypeBadge ({ type }) {
    
    return (
        <div>
            <div className={`icon ${type}`}>
                <img src={typeIcons[type]} alt={typeTranslations[type]} />
                {typeTranslations[type]}
            </div>
        </div>
    );
}

export default PokemonTypeBadge;