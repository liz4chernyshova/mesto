import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._inputsList = this._popup.querySelectorAll('.form__input');
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputsList.forEach(input => this._inputValues[input.name] = input.value);
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues())
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}