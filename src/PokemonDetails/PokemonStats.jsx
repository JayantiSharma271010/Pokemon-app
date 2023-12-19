import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
} from "chart.js";
import styled from "styled-components";

Chart.register(LinearScale, CategoryScale, BarController, BarElement);

const PokemonStats = ({ stats }) => {
  const data = {
    labels: stats.map((stat) => stat.stat.name),
    datasets: [
      {
        label: "Energy Stat",
        data: stats.map((stat) => stat.base_stat),
        backgroundColor: "blue",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        labels: stats.map((stat) => stat.stat.name),
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Wrapper>
      <h2>Stats</h2>
      <Bar data={data} options={options} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
`;
export default PokemonStats;
