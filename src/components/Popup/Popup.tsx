import React from "react";
import { PopupInterface } from "../../@types/globalTypes";
import { CloseButton, PopupContainer, PopupInner } from "./style";

const Popup: React.FC<PopupInterface> = (props) => {
  return props.trigger ? (
    <PopupContainer>
      <PopupInner>
        <CloseButton className="btn" onClick={() => props.setTrigger(false)}>
          <i className="bi bi-x"></i>
        </CloseButton>
        {props.children}
      </PopupInner>
    </PopupContainer>
  ) : null;
};

export default Popup;
