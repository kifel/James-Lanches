import { shade } from "polished";
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
    ${(props) => shade(0.2, props.theme.colors.backgroundNavbar)} 25%,
    ${(props) => props.theme.colors.background} 37%,
    ${(props) => shade(0.2, props.theme.colors.backgroundNavbar)} 63%
  );
  background-size: 1000px 100%;
`;

export const StyledImage = styled.img`
  max-height: 400px;
  width: 100%;
  display: block;
  margin: 0 auto;
  object-fit: cover;
`;

export const StyledImagePlaceholder = styled.div`
  width: 100%;
  height: 400px;
  background-color: ${(props) => props.theme.colors.backgroundNavbar};
  border-radius: 8px;
`;

export const AccordionWrapper = styled.div`
  .accordion {
    --bs-accordion-btn-active-icon: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23F00'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>");
  }

  .accordion-button.collapsed::after {
    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23808080'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>");
  }

  .accordion-header {
    border: 1px solid ${(props) => props.theme.colors.text};
    border-radius: 3px;
    .accordion-button {
      cursor: pointer;
      background: ${(props) => shade(0.1, props.theme.colors.backgroundNavbar)};
      font-weight: bold;
      color: ${(props) => props.theme.colors.text};
    }
  }

  .accordion-body {
    padding: 1rem;
    border: 1px solid ${(props) => props.theme.colors.text};
    border-top: none;
    background-color: ${(props) => props.theme.colors.background};

    p {
      color: ${(props) => props.theme.colors.text};
    }
  }
`;

export const BackIcon = styled.i`
  color: ${(props) => props.theme.colors.text};
`;
