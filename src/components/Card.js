export class Card {
    constructor({name, link, likes, owner, _id}, {openImage, deleteElement, functionLike}, templateSelector, userId) {
      this._templateElement = document.querySelector(templateSelector);
      this._element = this._getTemplate();
      this._link = link;
      this._name = name;
      this._openImage = openImage;
      this._likes = likes;
      this._idElement = _id;
      this._owner = owner._id;
      this._userId = userId;
      this._deleteElement = deleteElement;
      this._functionLike = functionLike;
      this._likesQuantity = this._element.querySelector('.photo-element__quantity'),
      this._elementPicture = '.photo-element__picture',
      this._elementTitle = '.photo-element__title',
      this._elementLike = '.photo-element__like',
      this._elementDelete = '.photo-element__delete-btn'
    }

    
    _getTemplate() {
      const newElement = this._templateElement.content.children[0].cloneNode(true);
      return newElement;
    }

    deleteLike(cardId, likes) {
      cardId.querySelector(this._elementLike).classList.remove('.photo-element__like_active');
      //cardId.querySelector(this._likesQuantity).textContent = likes.length;
      cardId.querySelector('.photo-element__quantity').textContent = likes.length;
    }
    
    addLike(cardId, likes) {
      cardId.querySelector(this._elementLike).classList.add('photo-element__like_active');
      //cardId.querySelector(this._likesQuantity).textContent = likes.length;
      cardId.querySelector('.photo-element__quantity').textContent = likes.length;
    }

    _deleteElement() {
        this._deleteElement(this._element);
    }
      
    _likeElement() {
        this._functionLike(this._element);
    }

    _setEventListeners() {
        this._element.querySelector(this._elementDelete).addEventListener('click', () => this._deleteElement());
        this._element.querySelector(this._elementLike).addEventListener('click', () => this._likeElement());
        this._element.querySelector(this._elementPicture).addEventListener('click', () => this._openImage(this._link, this._name));
    }
    
    generateCard() {
      this._setEventListeners();
      this._element.querySelector(this._elementPicture).src = this._link;
      this._element.querySelector(this._elementPicture).alt = this._name;
      this._element.querySelector(this._elementTitle).textContent = this._name;
      this._likesQuantity.textContent = this._likes.length;
      this._element.id = this._idElement;

      if(this._userId === this._owner) {
        this._element.querySelector(this._elementDelete).classList.add('photo-element__delete-btn_active');
      }
      this._likes.forEach(like => {
        if(like._id === this._userId) {
          this._element.querySelector(this._elementLike).classList.add('photo-element__like_active');
        }
      })
      return this._element;
    }
}