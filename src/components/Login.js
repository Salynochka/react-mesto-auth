import React from "react";
import Header from "./Header.js";
import {authorize} from "./auth.js";
import {useNavigate} from "react-router-dom";
//import Register from "./Register.js";

function Login(props) {
  const [formValue, setFormValue] = React.useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValue.username || !formValue.password){
      return;
    }
    authorize(formValue.username, formValue.password)
      .then((data) => {
        if (data.jwt){
          setFormValue({username: '', password: ''});
          navigate('/mesto', {replace: true});
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <Header 
        text="Регистрация" 
      />
      <section className="login">
        <div className="login__container">
          <h2 className="login__heading">{props.title}</h2>
          <form onSubmit={props.onSubmit} className="login__form" name="login">
            <fieldset className="login__input">
              <input
                type="text"
                className="login__item login__item_type_email"
                name="email"
                placeholder="Email"
                minLength="2"
                maxLength="40"
                required
                onChange={handleChange}
              />
              <span className="login__form-error login__form-error_type_email email-error" />
              <input
                type="text"
                className="login__item login__item_type_password"
                name="password"
                placeholder="Пароль"
                minLength="2"
                maxLength="200"
                required
                onChange={handleChange}
              />
              <span className="login__form-error login__form-error_type_password password-error" />
            </fieldset>
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
