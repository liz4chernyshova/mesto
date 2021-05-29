import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popup, { handleFormSubmit }) {
    super(popup)
    this._submitHandler = handleFormSubmit;
  }

  open(cardId) {
    super.open();
    this._cardId = cardId;
  }

  cardId() {
    return this._cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler();
    })
  }
}
