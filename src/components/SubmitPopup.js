import React from 'react';
import PopupWithForm from './PopupWithForm'

export default function SubmitPopup(props) {
    
    function handleSubmit(event) {
        event.preventDefault();

        props.onConfirm(props.card)
    }

    return(
        <PopupWithForm onSubmit={handleSubmit} name='submit' title='Вы уверены?' onClose={props.onClose} isOpen={props.isOpen}>
          <button className="popup__submit" type="submit" >Да</button>  
        </ PopupWithForm>
    )
}