export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl
        this.headers = options.headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
        .then(res => this._checkResponse(res))
    }

    getCardsinfo() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
        .then(res => this._checkResponse(res))
    }
    
    sendUserInfo(obj) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(obj)
        })
    }

    sendUserAvatar(obj) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(obj)
        })
        .then(res => this._checkResponse(res))
    }
    
    sendNewCard(obj) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(obj)
        })
        .then(res => this._checkResponse(res))
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        }).then(res => this._checkResponse(res))
    }

    setLike(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes `, {
            method: 'PUT',
            headers: this.headers
        }).then(res => this._checkResponse(res))
    }

    removeLike(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes `, {
            method: 'DELETE',
            headers: this.headers
        }).then(res => this._checkResponse(res))
    }
}