import React from 'react';
import '../index.css'
import addButtonIcon from '../images/add-button.svg';
import editAvatarIcon from '../images/editavataricon.svg';
import editIcon from '../images/edit-button.svg';
import Card from '../components/Card'
import api from '../utils/Api'
import CurrentUserContext from '../contexts/CurrentUserContext'


function Main (props) {
    const currentUser = React.useContext(CurrentUserContext);

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
    

    return (
        <main>
        <section className="profile">
            <button onClick={props.onEditAvatar} className="profile__edit-avatar-button">
                <img src={currentUser.avatar} alt="фото пользователя" className="profile__user-pic" />
                <img src={editAvatarIcon} className="profile__edit-avatar-icon" alt="иконка карандаша" />
            </button>
            <div className="profile__user-info">
                <div className="profile__name-and-button-container">
                    <h1 className="profile__user-name">{currentUser.name}</h1>
                    <button onClick={props.onEditProfile} className="profile__edit-button button" type="button">
                        <img src={editIcon} className="profile__edit-button-icon" alt="иконка карандаша" />
                    </button>
                </div>
                <p className="profile__user-job">{currentUser.about}</p>
            </div>
            <button onClick={props.onAddPlace} className="profile__add-button button" type="button">
                <img src={addButtonIcon} className="profile__add-button-icon" alt="иконка плюсика" />
            </button>
        </section>
        <section className="elements">
            {cards.map((card) => 
                (<Card onCardDelete={handleCardDelete}
                        onCardLike={handleCardLike}
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick} />)
            )}
        </section>
    </main>
    )
}

export default Main