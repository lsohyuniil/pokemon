import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPokemonDatas, fetchEvolutionList } from '../services/pokemonService';
import PokemonTypeBadge from '../components/PokemonTypeBadge';
import "./css/PokemonDetail.css"
import PokemonStatsGraph from "../components/PokemonStatsGraph"
import PokemonCard from '../components/PokemonCard'
import { Link } from 'react-router-dom';

const PokemonDetail = () => {
  const { id } = useParams();
  const pokemonId = parseInt(id, 10);
  const [evolutionList , setEvolutionList] = useState([]);
  const [pokemonData, setPokemonData] = useState(null);
  const [activeSlide, setActiveSlide] = useState("image");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemonDatas(pokemonId);

      setPokemonData(data);
    };

    fetchData();
  }, [pokemonId]);

  useEffect(() => {
    const fetchEvolutionData = async () => {
        if (!pokemonData || !pokemonData.evolution) {
            return;
        }

        try {
            const data = await fetchEvolutionList(pokemonData.evolution);
            console.log("Evolution Data:", data);
            setEvolutionList(data);
        } catch (error) {
            console.error("Error fetching evolution data:", error);
        }
    };

    fetchEvolutionData();
}, [pokemonData]);

  if (!pokemonData) return <div>Loading...</div>;

  return (
    <div className='box'>
      <div className='page-btns'>
        <Link className='prev-btn' to={`/pokemon/${pokemonId === 1 ? 1025 : pokemonId - 1}`}>
          &lt; No.{pokemonId === 1 ? 1025 : pokemonId - 1} {pokemonData.이전포켓몬이름}
        </Link>
        <Link className='next-btn' to={`/pokemon/${pokemonId === 1025 ? 1 : pokemonId + 1}`}>
          No.{pokemonId === 1025 ? 1 : pokemonId + 1} {pokemonData.다음포켓몬이름} &gt; 
        </Link>
      </div>

      <div className='pokemon-detail'>
        {/* 포켓몬 이름, 타입 */}
        <div className='pokemon-name-box'>
          <h1 className='pokemon-title'>No.{pokemonData.id}</h1>
          <h1 className='pokemon-title'>{pokemonData.이름}</h1>
            {pokemonData.타입.map((type) => (
              <PokemonTypeBadge key={type} type={type} />
            ))}
        </div>

        {/* 큰 화면 */}
        <div className='top-box type1'>
          {/* 포켓몬 이미지 */}
          <div className='pokemon-img-box'>
            <img className='pokemon-img' src={pokemonData.gifImage} alt={pokemonData.이름}/>
          </div>
          {/* 포켓몬 스탯 */}
          <div className='pokemon-stats'>
              <PokemonStatsGraph stats={pokemonData.스탯}/>
          </div>
        </div>

        {/* 작은 화면 */}
        <div className='top-box type2'>          
          {activeSlide === "image" ? (
            <>
              <div className='pokemon-img-box'>
                <img className='pokemon-img' src={pokemonData.gifImage} alt={pokemonData.이름}/>
              </div>
              <button className='slider-btn slider-next-btn' onClick={() => setActiveSlide("stats")}>&gt;</button>
            </>

          ) : (
            <>
              <button className='slider-btn slider-prev-btn' onClick={() => setActiveSlide("image")}>&lt;</button>
              <div className='pokemon-stats'>
                <PokemonStatsGraph stats={pokemonData.스탯}/>
              </div>
            </>
          )}
        </div>

        <div className='bottom-box'>
          {/* 포켓몬 설명 */}
          <div className='pokemon-description'>
            <p>{pokemonData.설명}</p>
            <div className='pokemon-description-detail'>
              <p><strong>분류:</strong> {pokemonData.분류}</p>
              <p><strong> / 특성:</strong> {pokemonData.특성.join(', ')}</p>
              <p><strong> / 폼:</strong> {pokemonData.폼}</p>
              <p><strong> / 키:</strong> {pokemonData.키}</p>
              <p><strong> / 몸무게:</strong> {pokemonData.몸무게}</p>
            </div>
          </div>
          {/* 포켓몬 진화 과정 */}
          <div className="evolution-list">
            <h1 className='evolution-title'>진화</h1>
            {evolutionList.map((index, i) => (
              <div className="pokemon-cards" key={index}>
                <PokemonCard index={index} />
                {i !== evolutionList.length - 1 && <span className="arrow"> &gt; </span>}
              </div>
            ))}
          </div>
        </div>
        <Link className='list-btn' to="/">목록</Link>
      </div>
    </div>
  );
};

export default PokemonDetail;
