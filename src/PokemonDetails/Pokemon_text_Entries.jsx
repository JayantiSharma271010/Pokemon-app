import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { CgPokemon } from "react-icons/cg";

const Pokemon_text_Entries = ({ id }) => {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const englishFlavorTextEntries = pokemonDetails.flavor_text_entries
    ? [
        ...new Set(
          pokemonDetails.flavor_text_entries
            .filter((entry) => entry.language.name === "en")
            .map((entry) => entry.flavor_text.split("  "))
            .flat()
        ),
      ]
    : [];

  const sanitizeTextEntries = (text) => {
    return text ? text.replace(/\f/g, "") : "";
  };

  function handlePrev() {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : englishFlavorTextEntries.length - 1
    );
  }
  function handleNext() {
    setCurrentIndex((prevIndex) =>
      prevIndex < englishFlavorTextEntries.length - 1 ? prevIndex + 1 : 0
    );
  }
  return (
    <Wrapper>
      {pokemonDetails && (
        <>
          <div className="text-Entries">
            <div className="text-entry" key={id}>
              {sanitizeTextEntries(englishFlavorTextEntries[currentIndex])}
            </div>
          </div>
          <div className="buttons">
            <button onClick={handlePrev} disabled={currentIndex === 0}>
              <CgPokemon className="blue btn-icon" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= englishFlavorTextEntries.length - 1}
            >
              <CgPokemon className="red btn-icon" />
            </button>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Pokemon_text_Entries;

const Wrapper = styled.section`
  .text-Entries {
    display: flex;
  }
  .text-entry {
    height: auto;
    padding: 1rem;
    font-size: 16px;
    word-spacing: 1.5px;
    background: #a4a4a4;
    border-radius: 5px;

  }
  .buttons {
    display: flex;
    width: 100%;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    button {
      border: 0;
      outline: 0;
      background: none;
      cursor: pointer;
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    .blue {
      color: #0072b0;
      &:active {
        outline: 5px solid #17adff;
        outline-offset: 3px;
        border-radius: 50%;
      }
    }
    .red {
      color: #dd2d51;
      &:active {
        outline: 5px solid #f3b7c3;
        outline-offset: 3px;
        border-radius: 50%;
      }
    }
  }

  .btn-icon {
    background: white;
    font-size: 3rem;
    position: relative;
  }
`;
