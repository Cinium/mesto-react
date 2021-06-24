import React from 'react'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import api from '../utils/Api'
import CurrentUserContext from '../contexts/CurrentUserContext'
import '../index.css'

function App() {

  const [isEditProfilePopupOpen, setEditProfileState] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlaceState] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarState] = React.useState(false)
  const [isImagePopupOpen, setImagePopupState] = React.useState(false)

  const [selectedCard, setSelectedCard] = React.useState({})

  const [currentUser, setCurrentUser] = React.useState({})

  React.useEffect(() => {
    api.getUserData()
      .then(res => {
        setCurrentUser(res)
      })
  }, [])

  const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        api.getInitialCards()
            .then(res => {
                setCards(res)
            })
            .catch(err => console.log(err))
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(otvet => {
                setCards(
                    cards.filter(c => !(c._id === card._id))
                )
            })
    }

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

  function handleUpdateUser(userData) {
    api.patchUserInfo(userData)
      .then((res) => {
        setCurrentUser(res)

        closeAllPopups()
      })
  }

  function handleUpdateAvatar(avatarLink) {
    api.patchUserPic(avatarLink)
      .then(res => {
        setCurrentUser(res)

        closeAllPopups()
      })
  }

  

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />

      <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

      <PopupWithForm name='add' title='Новое место' onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} >
        <input id="place-input" className="popup__input popup__input_type_place" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" defaultValue="" required />
          <span className="popup__error place-input-error"></span>

          <input id="link-input" className="popup__input popup__input_type_link" type="url" name="link" placeholder="Ссылка на картинку" defaultValue="" required />
          <span className="popup__error link-input-error"></span>

          <button className="popup__submit" type="submit" >Создать</button>
      </ PopupWithForm>
      
      <PopupWithForm name='submit' title='Вы уверены?' onClose={closeAllPopups}>
        <button className="popup__submit" type="submit" >Да</button>  
      </ PopupWithForm>
      
      <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
