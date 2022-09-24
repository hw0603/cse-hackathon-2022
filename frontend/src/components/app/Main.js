import React from "react";
import Router from "../Router";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 3rem;
  width: 1100px;
  margin: 0 auto;
`;

export default function Main() {
  return (
    <Container>
      <Router />
    </Container>
  );
}
