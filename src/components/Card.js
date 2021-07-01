import deleteIcon from '../images/Trash.svg';
import CurrentUserContext from '../contexts/CurrentUserContext'
import React from 'react';


function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);


    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return(
        <article className="element" >
            <button onClick={handleDeleteClick} className={`element__delete-button ${!isOwn ? 'element__delete-button_hidden' : ''}`}>
                <img src={deleteIcon} alt="удалить" className="element__delete-icon" />
            </button>
            <div className="element__image" onClick={handleClick} style={{ backgroundImage: `url(${props.card.link})` }}/>
            <div className="element__container">
                <h2 className="element__title">{props.card.name}</h2>      
                <div className="element__likes-container">
                    <button onClick={handleLikeClick} className={`element__like-button ${isLiked ? 'element__active-like-icon' : ''}`} type="button"></button>
                    <p className="element__like-amount">{props.card.likes.length}</p>
                </div>
            </div> 
        </article>
    )
}

export default Card