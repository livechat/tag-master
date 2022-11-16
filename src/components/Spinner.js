import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  margin-top: ${({ marginTop }) => marginTop};
`;

export default ({ marginTop }) => (
  <Wrapper marginTop={marginTop}>
    <Loader type="Oval" color="#4384f5" />
  </Wrapper>
);
