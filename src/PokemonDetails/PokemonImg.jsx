import React from "react";
import styled from "styled-components";

const PokemonImg = ({ image }) => {
  return (
    <Wrapper className="BigImg-container">
      {" "}
      <img src={image} alt="" />
    </Wrapper>
  );
};

export default PokemonImg;

const Wrapper = styled.section`
  height: 70%;
  background: #f2f2f2;
  width: 100%;
  max-width: 40rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  
img{
  width: 70%;
}
@media (width <= 768px) {
  width: 95%;
  img{
    width: 45%;
  }
}

@media (width <= 320px) {
  width: 89%;
}
`;
