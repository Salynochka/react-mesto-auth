import React from "react";

function InfoToolTip(props) {
  return (
    <section
      className={`popup-info ${props.isOpen && "popup_opened"}`}
    >
      <div className={`popup-info__container `}>
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        />
        <p className={`popup-${props.name}__img}`}/>
        <h2 className="popup-info__heading">{props.title}</h2>
      </div>
    </section>
  );
}

export default InfoToolTip;