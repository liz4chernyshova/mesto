import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._photoImage = this._popup.querySelector('.popup-photo__image');
        this._photoTitle = this._popup.querySelector('.popup-photo__title');
    }

    open(link, alt) {
        this._photoImage.src = link;
        this._photoImage.alt = alt;
        this._photoTitle.textContent = alt;
        super.open();
    }
}