import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup-${props.name} ${props.isOpen && "popup_opened"}`}
    >
      <div className={`popup__container popup-${props.name}__container`}>
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        />
        <h2 className="popup__heading">{props.title}</h2>
        <form
          onSubmit={props.onSubmit}
          className="popup__form popup-update__form"
          name={`information-${props.name}`}
        >
          {props.children}
          <button className="popup__button" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
