import React,{ createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemonlist, setPokemonlist] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(0);

  const fetchData = async () => {
    try {
      const promises = [];
      for (let i = 1 + offset; i <= limit + offset; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(axios.get(url));
      }
      const results = await Promise.all(promises);
      const pokemonData = results.map((response) => ({
        name: response.data.name,
        id: response.data.id,
        image: response.data.sprites.other.dream_world["front_default"],
        typed: response.data.types.map((type) => [type.type.name]),
        stats: response.data.stats.map((power) => power),
        basicInfo: {
          height: response.data.height,
          weight: response.data.weight,
          ability: response.data.abilities[0].ability.name,
        },
      }));

      setPokemonlist((prevList) => [...prevList, ...pokemonData]);
    } catch (error) {
      console.error("Error fetching data:" + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [offset, limit]);

  const handleSearch = (event) => {
    const eventValue = event.target.value;
    setSearchItem(eventValue);
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => (prevOffset += limit));
  };

  const filteredPokemon = pokemonlist.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      pokemon.typed.some((type) => {
        return type.includes(searchItem.toLowerCase());
      })
    );
  });

  return (
    <PokemonContext.Provider
      value={{
        pokemonlist,
        searchItem,
        limit,
        offset,
        fetchData,
        handleSearch,
        handleLoadMore,
        filteredPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  return useContext(PokemonContext);
};
