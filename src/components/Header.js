import React from "react";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo" src={logo}></div>
      <a className="header__text" href={``}>{props.text}</a>
    </header>
  );
}

export default Header;
