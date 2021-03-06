export class Api {
    constructor({address, headers}) {
      this._address = address;
      this._headers = headers;
    }
  
    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    setUserInfo(name, about) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this._checkResponse)
    }

    addCard(cardData) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        })
        .then(this._checkResponse)
    }

    likeCard(id) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    unLikeCard(id) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    popupEditAvatar(link) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
    }
  
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`????????????: ${res.status}`);
    }
    
}