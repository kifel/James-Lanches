import { shade } from "polished";
import styled from "styled-components";

interface Props {
  width: string;
}

export const SkeletonContainer = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  height: 20rem;
`;

export const SkeletonContent = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundNavbar};
  height: 40rem;
`;

export const SkeletonCircle = styled.div`
  width: 120px;
  height: 120px;
  background-color: ${(props) => shade(0.2, props.theme.colors.background)};
  border-radius: 50%;
`;

export const SkeletonLine = styled.div<Props>`
  width: ${(props) => props.width || "100px"};
  height: 20px;
  background-color: ${(props) => shade(0.2, props.theme.colors.background)};
  margin-bottom: 2px;
`;

export const SkeletonButton = styled.div<Props>`
  width: ${(props) => props.width || "150px"};
  height: 20px;
  background-color: ${(props) => shade(0.2, props.theme.colors.background)};
  margin-top: 5rem;
`;
