function ImagePopup(props) {
    return (
        <div className={`popup popup-image ${props.isOpen ? ('popup_opened') : ('')}`}>
            <figure className="popup__figure">
                <button onClick={props.onClose} className="popup__close-button button" type="button"></button>
                <img className="popup__image" alt="фото места" src={props.card.link} />
                <figcaption className="popup__image-title">{props.card.name}</figcaption>
            </figure>
            <div className={`popup-image__overlay overlay ${props.isOpen ? 'overlay_opened' : ''}`}></div>
        </div>
    )
}

export default ImagePopup;