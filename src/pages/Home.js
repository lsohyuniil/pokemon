import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import { fetchPokemonList, fetchPokemonByTypes } from "../services/pokemonService";
import { useInView } from 'react-intersection-observer';
import "./css/Home.css";

function Home({ selectedTypes }) {
  const LIMIT_NUM = 20;
  const typeValue = Object.values(selectedTypes).some(value => value);

  const [pokemonList , setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  
  const [page, setPage] = useState(0);
  const [ref, inView] = useInView(true);

  // 전체 데이터 가져오기
  useEffect(() => {
    async function fetchData() {
      try {
        const offset = page * LIMIT_NUM;
        const pokemonData = await fetchPokemonList(offset);

        setPokemonList((prevList) => {
          const newList = [...prevList, ...pokemonData]; 
          return newList; 
        });

      } catch (error) {
          console.error('Error:', error);
        }
    }

    fetchData();

  }, [page]);  
    
  // 타입 선택시 타입별 포켓몬 데이터 가져오기
  useEffect(() => {
    async function filterPokemon() {
      const selectedTypeList = Object.keys(selectedTypes).filter(type => selectedTypes[type]);

      if (selectedTypeList.length === 0) {
        return;
      }

      try {
        const typeFilteredPokemon = await fetchPokemonByTypes(selectedTypeList);
        setFilteredPokemon(typeFilteredPokemon);
      } catch (error) {
        console.error("타입별 포켓몬 데이터를 불러오는 중 오류 발생:", error);
      }
    }

    filterPokemon();

    // window.scrollTo(0,0);
    
  }, [selectedTypes]);

  // 무한 스크롤 
  useEffect(() => {
    const uploadData = () => {
      
      // inView === true  page 이전 값에서의 증가.
      if (inView) {
        setPage((prev) => prev + 1);
      }
    };
    
    uploadData();
    
    // inView 가 감지되면 uploadData() 호출
  }, [inView]);

  return(
    <div>
      {typeValue ?
        <div className="pokemon-list-container">
            {filteredPokemon.length === 0 ?
              <div className="txt">
                해당되는 포켓몬이 없습니다.
              </div>
              :
              <>
                {filteredPokemon.map((pokemon, index) => (
                  <PokemonCard key={index} index={pokemon.id} />
                ))}
              </>
            }
        </div>
      :
        <>
          <div className="pokemon-list-container">
            {pokemonList.map((pokemon, index) => (
              <PokemonCard key={index} index={index + 1} />
            ))}
          </div>
          <div ref={ref} style={{ height: "1px", visibility: "hidden" }}></div>
        </>
        }
    </div>
  );
}

export default Home;