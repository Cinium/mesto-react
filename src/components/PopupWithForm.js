function PopupWithForm(props) {
    return (
        <div
            className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}
        >
            <div className="popup__container">
                <form
                    onSubmit={props.onSubmit}
                    className="popup__form"
                    name={`${props.name}Form`}
                    noValidate
                >
                    <button
                        className="popup__close-button button"
                        type="button"
                        onClick={props.onClose}
                    ></button>
                    <h2 className="popup__title">{props.title}</h2>

                    {props.children}

                    <button className="popup__submit" type="submit">
                        {props.buttonText}
                    </button>
                </form>
            </div>
            <div
                onClick={props.onClose}
                className={`overlay ${props.isOpen ? 'overlay_opened' : ''}`}
            ></div>
        </div>
    );
}

export default PopupWithForm;