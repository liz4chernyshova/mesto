export class Card {
    constructor(item, openCard, templateSelector) {
        this._templateElement = document.querySelector(templateSelector),
        this._link = item.link,
        this._name = item.name,
        this._openCard = openCard,
        this._elementDelete = document.querySelector('.photo-element__delete-btn');
        this._elementLike = document.querySelector('.photo-element__like');
        this._elementPicture = document.querySelector('.photo-element__picture');
        this._elementTitle = document.querySelector('.photo-element__title');
    }

    _getTemplate() {
        const newElement = this._templateElement.content.children[0].cloneNode(true);
        return newElement;
    }

    _likeElement() {
       this._element.classList.toggle('photo-element__like_active');
    }

    _deleteElement() {
        this._element.closest('.photo-element').remove();
    }

    _setEventListeners() {
        this._element.querySelector(this._elementLike).addEventListener('click', this._likeElement());
        this._element.querySelector(this._elementDelete).addEventListener('click', this._deleteElement());
        this._element.querySelector(this._elementPicture).addEventListener('click', () => openCard(this._link, this._name));
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