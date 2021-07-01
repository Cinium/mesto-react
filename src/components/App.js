import React from 'react'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import SubmitPopup from './SubmitPopup'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import api from '../utils/api'
import CurrentUserContext from '../contexts/CurrentUserContext'


function App() {
  // *** СТЕЙТЫ *** 

  // стейты видимости попапов
  const [isEditProfilePopupOpen, setEditProfileState] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlaceState] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarState] = React.useState(false)
  const [isImagePopupOpen, setImagePopupState] = React.useState(false)
  const [isSubmitPopupOpen, setSubmitPopupState] = React.useState(false)

  // стейты индикации загрузки
  const [isPlaceAdding, setAddPopupLoading] = React.useState(false)
  const [isAvatarEditing, setAvatarPopupLoading] = React.useState(false)
  const [isProfileEditing, setEditPopupLoading] = React.useState(false)
  const [isConfirming, setSubmitPopupLoading] = React.useState(false)

  // стейт выбранной карточки
  const [selectedCard, setSelectedCard] = React.useState({})
  // стейт текущего юзера
  const [currentUser, setCurrentUser] = React.useState({})
  // стейт карточек
  const [cards, setCards] = React.useState([])


  // *** ЭФФЕКТЫ ***

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(res => {
        // получение данных пользователя
        setCurrentUser(res[0])

        // рендеринг набора карточек
        setCards(res[1])
      })
      .catch(err => console.log(err))
  }, [])



  // *** ОБРАБОТЧИКИ ***

  // обработчик клика на аватар
  function handleEditAvatarClick() {
    setEditAvatarState(true)
  }

  // обработчик клика на кнопку редактирования профиля
  function handleEditProfileClick() {
    setEditProfileState(true);
  }

  // обработчик клика на кнопку добавления карточки
  function handleAddPlaceClick() {
    setAddPlaceState(true);
  }

  // обработчик клика на картинку карточки
  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupState(true);
  }

  // закрыть все попапы
  function closeAllPopups() {
    setEditAvatarState(false);
    setEditProfileState(false);
    setAddPlaceState(false);
    setImagePopupState(false);
    setSubmitPopupState(false);
  }

  // обработчик лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
        
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    }

  // обработчик удаления карточки
  function handleCardDelete(card) {
    setSubmitPopupLoading(true)

    api.deleteCard(card._id)
      .then(() => {
        setCards(
          cards.filter(c => c._id !== card._id)
        )
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setSubmitPopupLoading(false))
    }
  
  // обработчик подтверждения удаления карточки
  function handleDeleteConfirmation(card) {
    closeAllPopups();

    setSelectedCard(card);

    setSubmitPopupState(true);
  }

  // обработчик изменения информации пользователя
  function handleUpdateUser(userData) {
    setEditPopupLoading(true)

    api.patchUserInfo(userData)
      .then((res) => {
        setCurrentUser(res)

        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(() => setEditPopupLoading(false))
  }

  // обработчик изменения аватара
  function handleUpdateAvatar(avatarLink) {
    setAvatarPopupLoading(true)

    api.patchUserPic(avatarLink)
      .then(res => {
        setCurrentUser(res)

        closeAllPopups()

        avatarLink = '';
      })
      .catch(err => console.log(err))
      .finally(() => setAvatarPopupLoading(false))
  }

  // обработчик добавления карточки
  function handleAddPlaceSubmit(cardData) {
    setAddPopupLoading(true);

    api.postCard(cardData)
      .then(res => {
        setCards([res, ...cards])

        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(() => {setAddPopupLoading(false)})
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
              onCardDelete={handleDeleteConfirmation}
        />
        <ImagePopup card={selectedCard}
                    onClose={closeAllPopups}
                    isOpen={isImagePopupOpen}
        />

        <EditProfilePopup buttonText={`Сохранить`}
                          isLoading={isProfileEditing}
                          onUpdateUser={handleUpdateUser}
                          isOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopups}
        />

        <EditAvatarPopup buttonText={`Сохранить`}
                         isLoading={isAvatarEditing} onUpdateAvatar={handleUpdateAvatar}
                         isOpen={isEditAvatarPopupOpen}
                         onClose={closeAllPopups}
        />

        <AddPlacePopup buttonText={`Создать`}
                       isLoading={isPlaceAdding}
                       onAddPlace={handleAddPlaceSubmit}
                       isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}
        />
      
        <SubmitPopup buttonText={`Да`}
                     isLoading={isConfirming}
                     card={selectedCard}
                     onConfirm={handleCardDelete}
                     isOpen={isSubmitPopupOpen}
                     onClose={closeAllPopups}
        />
      
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
