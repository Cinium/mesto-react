import React from 'react';
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup(props) {
    const inputRef = React.useRef() 

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar(inputRef.current.value);

        inputRef.current.value = ''
      }


    return (
        <PopupWithForm onSubmit={handleSubmit} name='avatar' title='Обновить аватар' onClose={props.onClose} isOpen={props.isOpen}>
            <input ref={inputRef} id="avatar-input" className="popup__input popup__input_type_avatar" type="url" name="link" placeholder="Ссылка на картинку" defaultValue='' required />
            <span className="popup__error avatar-input-error"></span>
            <button className="popup__submit" type="submit" >Сохранить</button>  
        </ PopupWithForm>
    )
}