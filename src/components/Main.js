import React from 'react';
import '../index.css'
import addButtonIcon from '../images/add-button.svg';
import editAvatarIcon from '../images/editavataricon.svg';
import editIcon from '../images/edit-button.svg';
import Card from '../components/Card'
import CurrentUserContext from '../contexts/CurrentUserContext'


function Main (props) {
    const currentUser = React.useContext(CurrentUserContext);

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
            {props.cards.map((card) => 
                (<Card onCardDelete={props.onCardDelete}
                        onCardLike={props.onCardLike}
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick} />)
            )}
        </section>
    </main>
    )
}

export default Main