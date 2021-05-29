import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popup, handleFormSubmit ) {
    super(popup)
    this._submitHandler = handleFormSubmit;
  }

  open(cardId) {
    super.open();
    this._cardId = cardId;
    return this._card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._cardData);
    })
  }
}
