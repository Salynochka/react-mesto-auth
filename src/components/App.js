import React, { useEffect } from "react";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoToolTip from "./InfoToolTip.js";
import * as auth from "../utils/auth.js";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.js";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const [isRegistration, setIsRegistration] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const [infoToolTip, setInfoTooltip] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    api
      .getCards()
      .then((card) => {
        setCards([...card]);
      })
      .catch(console.error);
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopup(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    // Проверка наличия лайка на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((i) => (i._id === card._id ? newCard : i))
        );
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.error(`Ошибка: ${err}`));
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }

  function handleUpdateAvatar(avatar) {
    api
      .editAvatarPhoto(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }

  function handleSubmitAddPlace(data) {
    api
      .createNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }

  function handleRegistration(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsRegistration(true);
        setInfoTooltip(true);
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        setIsRegistration(false);
        setInfoTooltip(true);
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem("token", data.token);
        checkActiveToken(data.token);
        setEmail(data.email);
        navigate("/main", { replace: true });
      })
      .catch((err) => {
        setIsRegistration(false);
        setInfoTooltip(true);
        console.log(err);
      });
  }

  function checkActiveToken() {
    const jwt = localStorage.getItem('jwt');

    auth
      .checkToken(jwt)
      .then((res) => {
        if (!res) {
          return;
        }
        setLoggedIn(true);
        setEmail(res);
       // navigate("/main", { replace: true });
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err);
      });
  }

  React.useEffect(() => {
    checkActiveToken();
  }, []);

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setEmail("");
    navigate("/signin", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login 
                  title="Вход" 
                  buttonText="Войти" 
                  onSubmit={handleLogin} 
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  title="Регистрация"
                  buttonText="Зарегистрироваться"
                  onSubmit={handleRegistration}
                />
              }
            />
            <Route
              element={
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />
              }
            />
            <Route
              element={
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />
              }
            />
            <Route
              element={
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleSubmitAddPlace}
                />
              }
            />
            <Route
              element={
                <PopupWithForm
                  title="Вы уверены?"
                  name="confitmation"
                  onClose={closeAllPopups}
                  buttonText="Да"
                />
              }
            />
            <Route
              element={
                <ImagePopup
                  card={selectedCard}
                  onClose={closeAllPopups}
                  isOpen={selectedCard}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
