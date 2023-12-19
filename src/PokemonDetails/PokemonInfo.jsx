import React, { useEffect, useState } from "react";
import axios from "axios";

import { usePokemonContext } from "../Components/PokemonContext";
import styled from "styled-components";

const PokemonInfo = ({ id }) => {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const { filteredPokemon } = usePokemonContext();
  const selectedPokemon = filteredPokemon.find(
    (pokemon) => pokemon.id === parseInt(id)
  );

  const { basicInfo } = selectedPokemon;
  const { height, weight, ability } = basicInfo;

  const pokeomonHeight = (height * 0.328084).toFixed(2);
  const pokemonWeight = (weight * 0.220462).toFixed(2);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );

        setPokemonDetails(response.data);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    fetchData();
  }, []);

  const generaValue = pokemonDetails.genera || [];
  const category = generaValue
    .filter((gene) => gene.language.name === "en")
    .map((gene) => gene.genus);

  return (
    <Wrapper>
      <div className="info-section">
        <ul className="first-section">
          <li>
            <span className="label">Height</span>
            <h3>{pokeomonHeight} </h3>
          </li>
          <li>
            <span className="label">Weight</span>
            <h3>{pokemonWeight} lbs</h3>
          </li>
        </ul>
        <ul className="second-section">
          <li>
            <span className="label">Category</span>
            <h3>{category}</h3>
          </li>
          <li>
            <span className="label">Abilities</span>
            <h3>{ability}</h3>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  li {
    list-style: none;
    margin: 0.5rem 0;
    padding: 0.3rem 1rem;
    text-align: center;
  }

  .first-section li,
  .second-section li:not(:last-child) {
    border-bottom: 1px solid #000;
  }

  .info-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #30a7d7;
    border-radius: 5%;
    width: fit-content;
    margin: 1rem 0;
  }
  .label {
    font-size: 18px;
    color: white;
  }

  h3 {
    font-size: 20px;
    font-weight: 400;
    text-transform: capitalize;
  }

  @media (width <= 1024px) {
    .info-section {
      flex-direction: row;
      width: 100%;
      justify-content: space-around;
    }

    li {
      border-bottom: #30a7d7 !important;
      text-align: start;
    }
  }
  

  @media (width <= 425px) {
    .info-section {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    li {
      border-bottom: 1px solid #000 !important;
      text-align: center !important;
    }
  }
`;
export default PokemonInfo;
