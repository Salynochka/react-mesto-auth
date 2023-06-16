import React from "react";
import Header from "./Header.js";
//import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Register(props) {
  return (
    <>
    <Header text="Войти"/>
    <section className="register">
      <div className="register__container">
        <h2 className="register__heading">{props.title}</h2>
        <form onSubmit={props.onSubmit} className="register__form" name="login">
          <button className="register__button" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
    </>
  );
}

export default Register;
