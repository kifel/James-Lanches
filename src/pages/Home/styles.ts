import { shade } from "polished";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface SectionTittleProps {
  inView: boolean;
}

// export const Container = styled.div`
//   transition: all 0.5s ease;
//   background: rgba(0, 0, 0, 0.001);
//   color: #f4f4f4;
//   box-shadow: ${(props) => shade(0.19, props.theme.colors.background)} 0px 10px
//       20px,
//     ${(props) => shade(0.23, props.theme.colors.background)} 0px 6px 6px;
// `;

export const Banner = styled.img`
  height: 50vh;
  transition: all 0.5s ease;
  object-fit: cover;
`;

export const Tittle = styled.h5`
  font-size: 2rem;
  color: #fff;
  line-height: 1em;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  text-shadow: 0 0 2px #000;
  transition: all 0.5s ease;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const TittleSpan = styled.span`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary};
  line-height: 1em;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  transition: all 0.5s ease;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const CartText = styled.h5`
  font-size: 1.2rem;
  color: #f4f4f4f4;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  -webkit-text-size-adjust: none;
  text-shadow: 0 0 2px #000;
  transition: all 0.5s ease;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 375px) {
    font-size: 0.8rem;
  }

  @media (max-width: 280px) {
    font-size: 0.7rem;
  }
`;

export const SectionTittle = styled.h2<SectionTittleProps>`
  color: ${(props) => props.theme.colors.secondary};
  margin-top: 100px;
  font-size: 2rem;
  line-height: 1em;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.01);
  font-weight: bold;
  width: 380px;
  border-bottom: 2px solid
    ${(props) => (props.inView ? props.theme.colors.secondary : "transparent")};
  padding-bottom: 15px;
  transition: all 0.5s ease;

  @media (max-width: 425px) {
    font-size: 1.5rem;
    width: 300px;
  }
`;

export const ButtonProducts = styled(Link)`
  color: #f4f4f4f4;
  font-size: 1.5rem;
  background: ${(props) => props.theme.colors.secondary};
  line-height: 1em;
  font-weight: bold;
  width: 300px;
  transition: all 0.5s ease;
  padding: 15px;

  &:hover {
    background: ${(props) => shade(0.5, props.theme.colors.secondary)};
    color: #f4f4f4f4;
  }
`;

export const AboutUsTitle = styled.h2<SectionTittleProps>`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 2rem;
  line-height: 1em;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.01);
  font-weight: bold;
  width: 170px;
  padding-bottom: 15px;
  border-bottom: 2px solid
    ${(props) => (props.inView ? props.theme.colors.secondary : "transparent")};
  transition: all 0.5s ease;
  margin-top: 150px;

  @media (max-width: 425px) {
    font-size: 1.5rem;
    width: 300px;
  }
`;
