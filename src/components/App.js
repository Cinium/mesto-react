import React from 'react'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import '../index.css'

function App() {

  const [isEditProfilePopupOpen, setEditProfileState] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlaceState] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarState] = React.useState(false)
  const [isImagePopupOpen, setImagePopupState] = React.useState(false)

  const[selectedCard, setSelectedCard] = React.useState({})

  function handleEditAvatarClick() {
    setEditAvatarState(true)
  }

  function handleEditProfileClick() {
    setEditProfileState(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceState(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setImagePopupState(true)
  }


  function closeAllPopups() {
    setEditAvatarState(false)
    setEditProfileState(false);
    setAddPlaceState(false)
    setImagePopupState(false)
  }

  

  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />

      <PopupWithForm name='add' title='Новое место' onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} >
        <input id="place-input" className="popup__input popup__input_type_place" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" defaultValue="" required />
          <span className="popup__error place-input-error"></span>

          <input id="link-input" className="popup__input popup__input_type_link" type="url" name="link" placeholder="Ссылка на картинку" defaultValue="" required />
          <span className="popup__error link-input-error"></span>

          <button className="popup__submit" type="submit" >Создать</button>
      </ PopupWithForm>
      <PopupWithForm name='edit' title='Редактировать профиль' onClose={closeAllPopups} isOpen={isEditProfilePopupOpen}>
        <input id="name-input" placeholder="Имя" className="popup__input popup__input_type_name" minLength="2" maxLength="40" type="text" name="name" defaultValue="Жак-Ив Кусто" required />
        <span className="popup__error name-input-error"></span>

        <input id="job-input" placeholder="Вид деятельности" className="popup__input popup__input_type_job" minLength="2" maxLength="200" type="text" name="about" defaultValue="Исследователь океана" required />
        <span className="popup__error job-input-error"></span>

        <button className="popup__submit" type="submit">Сохранить</button>
      </ PopupWithForm>
      
      <PopupWithForm name='submit' title='Вы уверены?' onClose={closeAllPopups}>
        <button className="popup__submit" type="submit" >Да</button>  
      </ PopupWithForm>
      <PopupWithForm name='avatar' title='Обновить аватар' onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen}>
        <input id="avatar-input" className="popup__input popup__input_type_avatar" type="url" name="link" placeholder="Ссылка на картинку" defaultValue="" required />
        <span className="popup__error avatar-input-error"></span>
        <button className="popup__submit" type="submit" >Сохранить</button>  
      </ PopupWithForm>
      <Footer />
    </div>
  );
}

export default App;
