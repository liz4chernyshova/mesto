export class Card {
    constructor(item, openCard, templateSelector, api) {
        this._templateElement = document.querySelector(templateSelector),
        this._link = item.link,
        this._name = item.name,
        this._openCard = openCard,
        this._likesId = item.likes;
        this._myId = item.userId;
        this._elementDelete = '.photo-element__delete-btn';
        this._elementLike = '.photo-element__like';
        this._elementPicture = '.photo-element__picture';
        this._elementTitle = '.photo-element__title';
        this._api = api;
    }

    _setEventListeners() {
        this._element.querySelector(this._elementLike).addEventListener('click', () => this._likeElement());
        this._element.querySelector(this._elementDelete).addEventListener('click', () => this._deleteElement());
        this._element.querySelector(this._elementPicture).addEventListener('click', () => this._openCard(this._link, this._name));
    }

    _getTemplate() {
        const newElement = this._templateElement.content.children[0].cloneNode(true);
        return newElement;
    }

    _likes() {
        return Boolean(this._likesId.find((obj) => obj._id == this._myId));
    }

    _likeElement() {
       this._element.querySelector(this._elementLike).classList.toggle('photo-element__like_active');
    }

    _deleteElement() {
        this._element.closest('.photo-element').remove();
        this._element = null;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(this._elementTitle).textContent = this._name;
        this._element.querySelector(this._elementPicture).alt = this._name;
        this._element.querySelector(this._elementPicture).src = this._link;
        return this._element;
    }
}