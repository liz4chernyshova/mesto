import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._inputsList = this._popup.querySelectorAll('.form__input');
        this._btnElement = this._popup.querySelector('.form__save-btn');
        this._loadSubmit = this._btnElement.textContent;
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputsList.forEach(input => this._inputValues[input.name] = input.value);
        return this._inputValues;
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._btnElement.textContent = 'Сохранение...';
        } else {
            this._btnElement.textContent = this._loadSubmit;
        }
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