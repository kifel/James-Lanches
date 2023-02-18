import styled from "styled-components";

interface SectionTittleProps {
  inView: boolean;
}

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.001);
  color: #f4f4f4;
`;

export const Banner = styled.img`
  height: 50vh;
  filter: blur(2px);
  -webkit-filter: blur(2px);
  object-fit: cover;
`;

export const Tittle = styled.h5`
  font-size: 2rem;
  color: #fff;
  line-height: 1em;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.01);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const CartText = styled.h5`
  font-size: 1.2rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  -webkit-text-size-adjust: none;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const SectionTittle = styled.h2<SectionTittleProps>`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 2rem;
  line-height: 1em;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.01);
  /* border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
  padding-bottom: 15px; */
  width: 300px;
  border-bottom: 2px solid
    ${(props) =>
      props.inView ? props.theme.colors.secondary : "transparent"};
  padding-bottom: 15px;
  transition: all 0.5s ease;
`;
