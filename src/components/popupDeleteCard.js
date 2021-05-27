import Popup from './Popup.js'

export default class PopupDeleteCard extends Popup{
    constructor(popupSelector, {handleFormSubmit}) {
        super(popupSelector),
        this._handleFormSubmit = handleFormSubmit;
    }

    open(cardData) {
        super.open();
        this._cardData = cardData;
        return this._card;

    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._cardData);
            super.close();
        });
    }
}