import { statTranslations } from "../utils/types";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";
const SPECIES_API_URL = "https://pokeapi.co/api/v2/pokemon-species";
const TYPE_API_URL = "https://pokeapi.co/api/v2/type";

export const fetchPokemonList = async (offset) => {
    try{
        const res = await fetch(`${POKEMON_API_URL}?offset=${offset}&limit=20`);
        const data = await res.json();

        return data.results;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
};

export const fetchPokemonData = async (id) => {
  try {
    const speciesRes = await fetch(`${SPECIES_API_URL}/${id}`);
    const speciesData = await speciesRes.json();
    
    const pokemonRes = await fetch(`${POKEMON_API_URL}/${id}`);
    const pokemonData = await pokemonRes.json();
    
    // 앞 모습 gif
    const front_image = pokemonData.sprites.other?.showdown?.front_default || pokemonData.sprites.front_default;

    // 한글 이름 찾기
    const koreanName = speciesData.names.find(name => name.language.name === "ko")?.name;

    const translatedTypes = pokemonData.types.map(t => t.type.name);

    return {
      id: id,
      front_image: front_image,
      koreanName: koreanName,
      translatedTypes: translatedTypes,
    };
  } catch (error) {
    console.error("데이터 가져오기 오류:", error);
  }
}

export const fetchPokemonDatas = async (id) => {
  try {
    const speciesRes = await fetch(`${SPECIES_API_URL}/${id}`);
    const speciesData = await speciesRes.json();

    const pokemonRes = await fetch(`${POKEMON_API_URL}/${id}`);
    const pokemonData = await pokemonRes.json();

    const front_gif = pokemonData.sprites.other["official-artwork"].front_default;

    // 한글 이름
    const koreanName = speciesData.names.find(name => name.language.name === "ko")?.name;

    let prevNum = id - 1;
    let nextNum = id + 1;

    if (prevNum === 0){
      prevNum = 1025;
    } else if (nextNum === 1026) {
      nextNum = 1;
    }
    
    // 이전 포켓몬 이름
    const prevNameRes = await fetch(`${SPECIES_API_URL}/${prevNum}`);
    const prevNameData = await prevNameRes.json();
    const prevName = prevNameData.names.find(name => name.language.name === "ko")?.name;
    
    // 다음 포켓몬 이름
    const nextNameRes = await fetch(`${SPECIES_API_URL}/${nextNum}`);
    const nextNameData = await nextNameRes.json();
    const nextName = nextNameData.names.find(name => name.language.name === "ko")?.name;
    
    // 한글 분류
    const koreanGenus = speciesData.genera.find(genus => genus.language.name === "ko")?.genus;

    const koreanDescription = speciesData.flavor_text_entries
    .filter(entry => entry.language.name === "ko")
    .map(entry => entry.flavor_text)[0] || "";

    // 포켓몬 타입
    const translatedTypes = pokemonData.types.map(t => t.type.name);

    // 포켓몬 능력
    const translatedAbilities = pokemonData.abilities.map(a => a.ability.name);

    const translatedStats = {};
    pokemonData.stats.forEach(stat => {
      translatedStats[statTranslations[stat.stat.name]] = stat.base_stat;
    });

    const evolution = speciesData.evolution_chain.url;

    return {
      id: pokemonData.id,
      gifImage: front_gif,
      이전포켓몬이름: prevName,
      다음포켓몬이름: nextName,
      이름: koreanName,
      타입: translatedTypes,
      분류: koreanGenus,
      키: `${pokemonData.height / 10}m`,
      몸무게: `${pokemonData.weight / 10}kg`,
      특성: translatedAbilities,
      설명: koreanDescription,
      폼: pokemonData.forms.map(f => f.name),
      스탯: translatedStats,
      evolution
    };
  } catch (error) {
    console.error("데이터 가져오기 오류:", error);
  }
};

export const fetchEvolutionList = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.chain) {
      console.error("Invalid evolution data:", data);
      return [];
    }

    let evolutionList = [];
    
    // 진화 리스트
    const getEvolutionChain = (chain) => {
      if (chain.species && chain.species.url) {
        const lastNumber = chain.species.url.match(/\/(\d+)\/$/)?.[1];
        if (lastNumber) evolutionList.push(lastNumber);
      }

      // 다음 단계 진화
      if (chain.evolves_to.length > 0) {
        chain.evolves_to.forEach(nextChain => getEvolutionChain(nextChain));
      }
    };

    getEvolutionChain(data.chain);

    return evolutionList;
  } catch (error) {
    console.error("Error fetching evolution data:", error);
    return [];
  }
};

// 여러 타입별 포켓몬 ID
export async function fetchPokemonByTypes(selectedTypes) {
    try {
        if (selectedTypes.length === 0) return [];

        // 각 타입에 대해 API 호출하여 포켓몬 리스트 가져오기
        const typeRequests = selectedTypes.map(async (type) => {
            const response = await fetch(`${TYPE_API_URL}/${type}`);
            const data = await response.json();
            return data.pokemon.map(p => p.pokemon);
        });

        const results = await Promise.all(typeRequests);

        // 여러 타입의 포켓몬 교집합 구하기
        let filteredPokemon = results[0];
        for (let i = 1; i < results.length; i++) {
            filteredPokemon = filteredPokemon.filter(p => 
              results[i].some(p2 => p2.name === p.name) // 같은 이름을 가진 포켓몬만 남김
            );
        }

        // 포켓몬 정보 가져오기
        const detailedPokemonList = await Promise.all(
            filteredPokemon.map(async (pokemon) => {
            //     const detailsResponse = await fetch(pokemon.url);
            //     const details = await detailsResponse.json();

            //     return {
            //         id: details.id,
            //         // name: details.name,
            //         // image: details.sprites.front_default,
            //         // types: details.types.map(t => t.type.name),
            //     };
            // })
            try {
              const detailsResponse = await fetch(pokemon.url);
              
              if (!detailsResponse.ok) {
                console.log(`포켓몬 데이터 없음: ${pokemon.url}`);
                return null;
              }
  
              const details = await detailsResponse.json();
  
              if (details.id >= 1025) {
                return null;
              }
  
              return {
                id: details.id,
                // name: details.name,
                // image: details.sprites?.front_default || "", // 이미지 없을 경우 빈 문자열
                // types: details.types.map(t => t.type.name),
              };
  
          } catch (e) {
              console.error(`포켓몬 데이터 로드 중 오류 발생: ${pokemon.url}`, e);
              return null;
          }
      })

        );

      // return detailedPokemonList;
      return detailedPokemonList.filter(pokemon => pokemon !== null);

    } catch (error) {
        console.error(`Error fetching Pokémon by types (${selectedTypes.join(", ")}):`, error);
        return [];
    }
}
