import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popup) {
    super(popup)
  }

  open(deleteCard) {
    super.open();
    this._deleteCard = deleteCard;
  }


  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteCard();
    })
  }
}
