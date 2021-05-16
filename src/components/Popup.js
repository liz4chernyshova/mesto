import {popupConfig} from './constants.js';

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if(evt.key === 'Escape') {
            this.close(this._popup);
          }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if(evt.targen.clessList.contains(popupConfig.buttonClose)){
                this.close(this._pupup);
            }
            if(evt.target.classList.contains(this._popup.querySelector('popup_opened'))) {
                this.close(this._popup);
              }
        });
    }
}