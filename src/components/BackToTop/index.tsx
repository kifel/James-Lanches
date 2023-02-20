import React, { useEffect, useState } from "react";
import { Button, Icon } from "./styles";

const BackToTop: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.pageYOffset > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={handleClick}
      className={showButton ? "show" : ""}
    >
      <Icon className="bi bi-arrow-up"></Icon>
    </Button>
  );
};

export default BackToTop;
