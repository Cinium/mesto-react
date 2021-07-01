import React from 'react';
import PopupWithForm from './PopupWithForm'

export default function SubmitPopup(props) {

    function handleSubmit(event) {
        event.preventDefault();

        props.onConfirm(props.card)
    }

    return(
        <PopupWithForm buttonText={props.buttonText}
                       onSubmit={handleSubmit}
                       name='submit'
                       title='Вы уверены?'
                       onClose={props.onClose}
                       isOpen={props.isOpen}>
        </ PopupWithForm>
    )
}