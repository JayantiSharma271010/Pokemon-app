import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { usePokemonContext } from "./Components/PokemonContext";

function App() {
  const { filteredPokemon, searchItem, handleSearch, handleLoadMore } =
    usePokemonContext();
    console.log(filteredPokemon)

    useEffect(()=>{})
  return (
    <>
      <div className="bg-overlay"></div>
      <section className="container">
        <div className="heading"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4UeU5sY2J4LeNb1Ts9-nGxv-yD_c5oXhd59Mvp_FT-Q&s" alt="" /></div>
        <form>
          <input
            type="text"
            placeholder="Search for Pokemon"
            value={searchItem}
            onChange={handleSearch}
          />
        </form>

        <div>
          <ul className="grid">
            {filteredPokemon.map((pokemon, id) => (
              <>
                <Link to={`/pokemon/${pokemon.id}`}>
                  <div className={`card`} key={pokemon.id}>
                    <div className="img-container">
                      <img src={pokemon.image} alt="" />
                    </div>
                    <div className={`content `}>
                      <p className="index-number">#{pokemon.id}</p>
                      <p className="name">{pokemon.name.toUpperCase()}</p>
                      <div className="type">
                        {pokemon.typed.map((item) => (
                          <p className={`info ${item}`}>{item}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </ul>
        </div>
      </section>
      <div className="loadMore-btn">
        <button onClick={handleLoadMore}>Load more...</button>
      </div>
    </>
  );
}

export default App;
