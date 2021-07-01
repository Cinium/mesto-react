class Api {
    constructor({baseUrl, token}) {
      this._baseUrl = baseUrl;
      this._token = token;
    }
    
    // получить карточки
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._token
            }
        })
            .then(res => this._getResponse(res)) 
    }

    // опубликовать карточку
    postCard({name : newCardName, link : newCardLink}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newCardName,
                link: newCardLink
            })
        })
            .then(res => this._getResponse(res))
    }

    // удалить карточку
    deleteCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        })
            .then(res => this._getResponse(res))
    }

    // получить данные о пользователе
    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
            .then(res => this._getResponse(res))
    }

    // изменить данные пользователя
    patchUserInfo({name : newName, about: newAbout}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName,
                about: newAbout
            })
        })
            .then(res => this._getResponse(res))
    }

    // исправить аватарку
    patchUserPic(avatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
            .then(res => this._getResponse(res))
    }

    // махинации с лайком
    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: {
                authorization: this._token,
            },
        })
            .then(res => this._getResponse(res))
    }


    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`${res.status}`);
    }
  }
  
  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
    token: '4a0fd5ed-f833-4b54-9a45-07d1e986c1d5'
  });

  export default api;