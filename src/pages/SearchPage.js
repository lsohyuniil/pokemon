import { useLocation } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import pokemonKoreaNames from "../utils/pokemon_korean.json";
import "./css/SearchPage.css"

function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";
  // const typeValue = Object.values(selectedTypes).some(value => value);

  window.scrollTo(0,0);

  const filteredPokemon = Object.entries(pokemonKoreaNames)
    .filter(([name, id]) => name.includes(searchQuery))
    .map(([name, id]) => ({ name, id }));
  
  return (
    <div>
      <div className="search-pokemon-list">
        {/* {typeValue?
        <h2>선택된 타입: {Object.keys(selectedTypes).filter(type => selectedTypes[type]).join(", ") || "없음"}</h2>
          :
          <>
            {filteredPokemon.length > 0 ? (
              filteredPokemon.map((pokemon) => (
                <PokemonCard key={pokemon.id} index={pokemon.id} />
              ))
            ) : (
              <div className="no-search-results">검색 결과가 없습니다.</div>
            )}
          </>
        } */}

        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} index={pokemon.id} />
          ))
        ) : (
          <div className="no-search-results">검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
