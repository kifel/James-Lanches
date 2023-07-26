import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const SkeletonLoader = styled.div`
  width: 100%;
  height: 100%;
  animation: ${shimmer} 1.5s linear infinite;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.backgroundNavbar} 25%,
    ${(props) => props.theme.colors.background} 37%,
    ${(props) => props.theme.colors.backgroundNavbar} 63%
  );
  background-size: 1000px 100%;
`;

export const StyledImagePlaceholder = styled.div`
  width: 100%;
  height: 400px;
  background-color: ${(props) => props.theme.colors.backgroundNavbar};
  border-radius: 8px;
`;
