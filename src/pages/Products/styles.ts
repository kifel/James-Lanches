import { Pagination } from "@mui/material";
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
