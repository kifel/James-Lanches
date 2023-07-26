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

export const AccordionWrapper = styled.div`
  .accordion {
    --bs-accordion-btn-active-icon: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23F00'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>");
  }

  .accordion-button.collapsed::after {
    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23FFF'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>");
  }

  .accordion-header {
    .accordion-button {
      cursor: pointer;
      background: ${(props) => props.theme.colors.backgroundNavbar};
      font-weight: bold;
      color: ${(props) => props.theme.colors.text};
    }
  }

  .accordion-body {
    padding: 1rem;
    border: 1px solid #dee2e6;
    border-top: none;
    background-color: ${(props) => props.theme.colors.background};

    p {
      color: ${(props) => props.theme.colors.text};
    }
  }
`;
