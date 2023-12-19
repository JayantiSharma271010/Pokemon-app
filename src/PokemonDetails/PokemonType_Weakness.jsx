import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const PokemonType_Weakness = ({ id, selectedPokemon }) => {
  const [weakness, setWeakness] = useState([]);
  useEffect(() => {
    const fetchWeakness = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/type/${id}`
        );
        const weakness = response.data.damage_relations.double_damage_from;
        setWeakness(weakness);
      } catch (error) {}
    };
    fetchWeakness();
  }, []);

  return (
    <Wrapper>
      <div className="pokemon-type">
        <h3>Type</h3>

        <div className="type">
          {selectedPokemon.typed.map((item) => (
            <p className={`info ${item}`}>{item}</p>
          ))}
        </div>
      </div>

      <div className="pokemon-weakness">
        <h3>Weakness</h3>
        <div className="weakness">
          {weakness.map((weak) => (
            <p className={`info ${weak.name}`}>{weak.name}</p>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .info {
    font-size: 18px;
    width: 13rem;
    height: 2rem;
    text-align: center;
    margin-top: 0.7rem !important;
  }
  .pokemon-weakness {
    margin: 1rem 0;
  }

  .weakness {
    display: flex;
    flex-wrap: nowrap;
    gap: 1rem;
  }
`;

export default PokemonType_Weakness;
