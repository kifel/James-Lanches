import { shade } from "polished";
import styled, { keyframes } from "styled-components";

const skeletonAnimation = keyframes`
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    opacity: 0.7;
  }
`;

export const Card = styled.div`
  box-shadow: ${(props) => shade(0.19, props.theme.colors.background)} 0px 10px
      20px,
    ${(props) => shade(0.23, props.theme.colors.background)} 0px 6px 6px;
  background: ${(props) => props.theme.colors.backgroundNavbar};

  &:hover {
    background: ${(props) => shade(0.2, props.theme.colors.backgroundNavbar)};
  }

  .skeleton-text {
    background: ${(props) => shade(0.2, props.theme.colors.backgroundNavbar)};
    animation: ${skeletonAnimation} 1.5s infinite;
  }
`;

