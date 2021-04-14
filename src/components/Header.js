import React from "react";
import logo from "../img/logo.png";

const Header = () => {
  return (
    <header className="py-5 text-center">
      <img
        className="d-block mx-auto mb-3"
        src={logo}
        alt="project logo"
        width="72"
        height="72"
      />
      <h1>Message encryption</h1>
    </header>
  );
};

export default Header;
