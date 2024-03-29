import CurrentUserContext from '../contexts/CurrentUserContext';
import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameInputChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionInputChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
            onSubmit={handleSubmit}
            name="edit"
            title="Редактировать профиль"
            onClose={props.onClose}
            isOpen={props.isOpen}>
            <input
                onChange={handleNameInputChange}
                id="name-input"
                placeholder="Имя"
                className="popup__input popup__input_type_name"
                minLength="2"
                maxLength="40"
                type="text"
                name="name"
                value={name}
                required
            />
            <span className="popup__error name-input-error"></span>

            <input
                onChange={handleDescriptionInputChange}
                id="job-input"
                placeholder="Вид деятельности"
                className="popup__input popup__input_type_job"
                minLength="2"
                maxLength="200"
                type="text"
                name="about"
                value={description}
                required
            />
            <span className="popup__error job-input-error"></span>
        </PopupWithForm>
    );
}