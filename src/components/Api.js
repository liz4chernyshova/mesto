export class Api {
    constructor(options) {
      this._address = options.address;
      this._headers = options.headers;
    }
  
    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: данные пользователя не получены ${res.status}`);
        })
    }

    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: карточки не загружены ${res.status}`);
        })
    }

    setUserInfo(formData) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: formData.title,
                about: formData.subtitle
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: данные не обновлены ${res.status}`);
        })
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
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: данные не обновлены ${res.status}`);
        })
    }

    likeCard(id) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: лайк не установслен ${res.status}`);
            })
    }

    unLikeCard(id) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: лайк не снят${res.status}`);
            })
    }

    popupEditeAvatar(formData) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: formData.avatar
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Аватар не обновлен`);
            })
    }
  
    
  }