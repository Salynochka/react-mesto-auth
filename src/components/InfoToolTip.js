import React from "react";

function InfoToolTip(props) {
  return (
    <section
      className={`popup-info popup-info-${props.name} ${props.isOpen && "popup_opened"}`}
    >
      <div className={`popup-info__container popup-info-${props.name}__container`}>
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        />
        <img className="popup-info__img" src={props.picture}/>
        <h2 className="popup-info__heading">{props.title}</h2>
      </div>
    </section>
  );
}

export default InfoToolTip;