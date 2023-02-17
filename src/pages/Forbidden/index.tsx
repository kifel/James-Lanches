import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BannerNotFound,
  ButtonNotFound,
  ContainerNotFound,
  ContentNotFound,
  DescriptNotFound,
  SubTitleNotFound,
  TitleNotFound
} from "../NotFound/styles";

const Forbidden: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <ContainerNotFound>
      <ContentNotFound>
        <BannerNotFound>
          <TitleNotFound>403</TitleNotFound>
          <SubTitleNotFound>Opps! Access denied</SubTitleNotFound>
          <DescriptNotFound>
            You do not have permission to be here.
          </DescriptNotFound>
          <ButtonNotFound onClick={goHome}>BackTo Home</ButtonNotFound>
        </BannerNotFound>
      </ContentNotFound>
    </ContainerNotFound>
  );
};

export default Forbidden;
