import deleteIcon from '../images/Trash.svg';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
      } 

    return(
        <article className="element" >
            <button className="element__delete-button element__delete-button_hidden">
                <img src={deleteIcon} alt="удалить" className="element__delete-icon" />
            </button>
            <div className="element__image" alt="изображение" onClick={handleClick} style={{ backgroundImage: `url(${props.card.link})` }}/>
            <div className="element__container">
                <h2 className="element__title">{props.card.name}</h2>      
                <div className="element__likes-container">
                    <button className="element__like-button" type="button"></button>
                    <p className="element__like-amount">{props.card.likes.length}</p>
                </div>
            </div> 
        </article>
    )
}

export default Card