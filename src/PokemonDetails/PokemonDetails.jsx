import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePokemonContext } from "../Components/PokemonContext";
import Pokemon_text_Entries from "./Pokemon_text_Entries";
import PokemonImg from "./PokemonImg";
import PokemonStats from "./PokemonStats";
import PokemonInfo from "./PokemonInfo";
import PokemonType_Weakness from "./PokemonType_Weakness";
import "./PokemonDetails.css";
import styled from "styled-components";

const PokemonDetails = () => {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const { filteredPokemon } = usePokemonContext();
  const { id } = useParams();

  const selectedPokemon = filteredPokemon.find(
    (pokemon) => pokemon.id === parseInt(id)
  );

  if (!selectedPokemon) {
    return <div>Pokemon no found</div>;
  }

  const { name, image, stats } = selectedPokemon;

  return (
    <Wrapper className="pokemonDetails">
      <div className="name-container">
        <h2>{name}</h2>
        <span>#{id}</span>
      </div>
      <div className="pokemon-row-container">
        <div className="column-6">
          <PokemonImg image={image} />
          <PokemonStats stats={stats} />
        </div>
        <div className="column-6">
          <Pokemon_text_Entries id={id} />
          <PokemonInfo id={id} />
          <PokemonType_Weakness  id={id} selectedPokemon={selectedPokemon}/>
        </div>
      </div>
    </Wrapper>
  );
};

export default PokemonDetails;

const Wrapper = styled.section`
 
`;
