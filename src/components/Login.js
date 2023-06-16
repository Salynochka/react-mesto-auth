import React from "react";
import Header from "./Header.js";
//import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Login(props) {

  return (
    <>
    <Header text="Зарегистрироваться"/>
    <section className="login">
      <div className="login__container">
        <h2 className="login__heading">{props.title}</h2>
        <form onSubmit={props.onSubmit} className="login__form" name="login">
          <button className="login__button" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
    </>
  );
}

export default Login;
