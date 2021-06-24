function PopupWithForm(props) {
    return(
        <div className={`popup popup-${props.name} ${props.isOpen ? ('popup_opened') : ('')}`}>
            <div className="popup__container">
                <form onSubmit={props.onSubmit} className="popup__form" name={`${props.name}Form`} noValidate>
                    <button className="popup__close-button button" type="button" onClick={props.onClose}></button>
                    <h2 className="popup__title">{props.title}</h2>
                    
                    {props.children}
                </form>
            </div>
            <div className={`overlay ${props.isOpen ? 'overlay_opened' : ''}`}></div>
        </div>
    )
}

export default PopupWithForm