import React from "react";
import Header from "./Header.js";
import * as auth from "../utils/auth.js";
import {useNavigate} from 'react-router-dom';

function Register(props) {
  const [formValue, setFormValue] = React.useState({
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValue.password || !formValue.email){
      return;
    }
    auth.register({password:formValue.password, email:formValue.email})
      .then((data) => {
        if (data.jwt){
          setFormValue({password: '', email: ''});
          navigate('/signin', {replace: true});
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <Header 
        text="Войти"
        link="signin"
      />
      <section className="register">
        <div className="register__container" onSubmit={handleSubmit}>
          <h2 className="register__heading">{props.title}</h2>
          <form
            className="register__form"
            name="login"
          >
            <fieldset className="register__input">
              <input
                type="text"
                className="register__item register__item_type_email"
                name="email"
                placeholder="Email"
                minLength="2"
                maxLength="40"
                required
                onChange={handleChange}
              />
              <span className="register__form-error register__form-error_type_email email-error" />
              <input
                type="text"
                className="register__item register__item_type_password"
                name="password"
                placeholder="Пароль"
                minLength="2"
                maxLength="200"
                required
                onChange={handleChange}
              />
              <span className="register__form-error register__form-error_type_password password-error" />
            </fieldset>
            <button className="register__button" type="submit" onSubmit={handleSubmit}>
              {props.buttonText}
            </button>
            <a className="register__to-login" href="signin">Уже зарегистрированы? Войти</a>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
