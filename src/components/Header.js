import React from "react";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo" src={logo}></div>
      <h2 className="header__text">{props.text}</h2>
    </header>
  );
}

export default Header;
