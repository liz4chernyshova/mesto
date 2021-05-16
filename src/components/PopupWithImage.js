import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(link, alt) {
        const photoImage = this._popup.querySelector('.popup-photo__image');
        const photoTitle = this._popup.querySelector('.popup-photo__title')
        photoImage.src = link;
        photoImage.alt = alt;
        photoTitle.textContent = alt;
        super.open();
    }
}