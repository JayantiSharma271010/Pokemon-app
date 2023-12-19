import React from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./Routes";
import "./index.css";
import { PokemonProvider } from "./Components/PokemonContext";

const root = document.getElementById("root");

const renderApp = () => {
  createRoot(root).render(
    <PokemonProvider>
      <AppRoutes />
    </PokemonProvider>
  );
};

renderApp();
