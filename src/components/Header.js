import React from "react";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo" src={logo}></div>
      <div className="header__info">
        <p className={`header__email${props.mainIsOpened ? "_visible" : ""}`}>{props.email}</p>
        <a className="header__text" href={props.link} onClick={props.onExit}>{props.text}</a>
      </div>
    </header>
  );
}

export default Header;
