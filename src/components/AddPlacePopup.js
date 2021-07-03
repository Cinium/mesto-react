import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
    const [place, setPlace] = React.useState('');
    const [link, setLink] = React.useState('');

    function handlePlaceInputChange(e) {
        setPlace(e.target.value);
    }

    function handleLinkInputChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: place,
            link: link,
        });
    }

    return (
        <PopupWithForm
            buttonText={props.isLoading ? 'Создание...' : 'Создать'}
            onSubmit={handleSubmit}
            name="add"
            title="Новое место"
            isLoading={props.isLoading}
            onClose={props.onClose}
            isOpen={props.isOpen}>
            <input
                onChange={handlePlaceInputChange}
                id="place-input"
                className="popup__input popup__input_type_place"
                type="text"
                name="name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                value={place}
                required
            />
            <span className="popup__error place-input-error"></span>

            <input
                onChange={handleLinkInputChange}
                id="link-input"
                className="popup__input popup__input_type_link"
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                value={link}
                required
            />
            <span className="popup__error link-input-error"></span>
        </PopupWithForm>
    );
}