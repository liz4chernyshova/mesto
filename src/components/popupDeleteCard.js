import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popup, {handleFormSubmit}) {
    super(popup)
    this._handleFormSubmit = handleFormSubmit;
  }

  open(cardId) {
    super.open();
    this._cardId = cardId;
    console.log(this._cardId)
  }

  cardId() {
    return this._cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    })
  }
}
