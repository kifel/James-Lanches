import { shade } from "polished";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

export const Card = styled(Link)`
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  box-shadow: ${(props) => shade(0.19, props.theme.colors.background)} 0px 10px
      20px,
    ${(props) => shade(0.23, props.theme.colors.background)} 0px 6px 6px;
  background: ${(props) => props.theme.colors.backgroundNavbar};

  &:hover {
    background: ${(props) => shade(0.2, props.theme.colors.backgroundNavbar)};
  }
`;

export const ImageCard = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid red;
  border-radius: 50%;

  animation: ${spinAnimation} 1s linear infinite;
`;
