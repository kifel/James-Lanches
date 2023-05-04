import { shade } from "polished";
import styled, { keyframes } from "styled-components";

export const Card = styled.div`
  margin-top: -10rem;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  box-shadow: ${(props) => shade(0.19, props.theme.colors.background)} 0px 10px
      20px,
    ${(props) => shade(0.23, props.theme.colors.background)} 0px 6px 6px;
  background: ${(props) => props.theme.colors.backgroundNavbar};
  height: 45rem;
  @media (max-width: 575px) {
    height: 60rem;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;

    &:hover {
      filter: brightness(70%);
    }
  }
`;

export const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }

  p {
    color: white;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

type ButtonProps = {
  loading?: string;
};

export const ButtonLoading = styled.button<ButtonProps>`
  background: ${({ loading }) => (loading === "true" ? "#ccc" : "red")};
  color: ${({ loading }) => (loading === "true" ? "#333" : "#fff")};
  cursor: ${({ loading }) => (loading === "true" ? "not-allowed" : "pointer")};
  position: relative;
  width: 100%;
  height: 3em;

  &:hover {
    background: ${(props) => props.theme.colors.tertiary};
  }

  &::after {
    content: "";
    display: ${({ loading }) => (loading === "true" ? "block" : "none")};
    width: 0.9em;
    height: 0.9em;
    border-radius: 50%;
    border: 0.15em solid currentColor;
    border-top-color: transparent;
    animation: ${rotate} 0.6s linear infinite;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Dropzone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${(props) => props.theme.colors.secondary};
  height: 300px;
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
`;

export const IconUpload = styled.i`
  color: ${(props) => props.theme.colors.primary};
`;

export const ImageDropzone = styled.img`
  height: 290px;
  width: 90%;
  object-fit: contain;
`;
