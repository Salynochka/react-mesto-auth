import React from "react";
import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <div className="header__logo" src={logo}></div>
    </header>
  );
}

export default Header;
