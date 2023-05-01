import { Pagination } from "@mui/material";
import { shade } from "polished";
import styled from "styled-components";

export const StyledPagination = styled(Pagination)`
  & .MuiPaginationItem-root.Mui-selected {
    background-color: ${(props) =>
      props.theme.colors
        .primary}; /* Altere a cor de fundo do botão selecionado aqui */
    color: #f4f4f4; /* Altere a cor do texto do botão selecionado aqui */
  }
  & .MuiPaginationItem-root {
    color: ${(props) => props.theme.colors.text};
  }
`;

export const SelectCategory = styled.select`
  color: ${(props) => props.theme.colors.text};
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='%23D92949' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/></svg>");
  background-color: ${(props) =>
    shade(-0.1, props.theme.colors.backgroundNavbar)};

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary};
    outline: none;
  }

  option {
    &:nth-child(even) {
      background: ${(props) => shade(-0.05, props.theme.colors.background)};
    }
    &:nth-child(odd) {
      background: ${(props) => shade(0.05, props.theme.colors.background)};
    }
    &:checked {
      color: #ffff;
      background-color: ${(props) => shade(0.05, props.theme.colors.secondary)};
    }
    transition: opacity 0.3s ease;
  }
  transition: opacity 0.3s ease;
`;

export const SearchProductBox = styled.input`
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => shade(-0.1, props.theme.colors.backgroundNavbar)};
  ::placeholder {
    color: ${(props) => props.theme.colors.text};
  }
  &:focus {
    border: 1px solid ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary};
    outline: none;
    background: ${(props) => shade(-0.1, props.theme.colors.backgroundNavbar)};
    color: ${(props) => props.theme.colors.text};
  }

  transition: opacity 0.3s ease;
`;
