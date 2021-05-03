export {validationConfig};

const validationConfig = {
    formSelector: '.form',
    formInput: '.form__input',
    buttonElement: '.form__save-btn',
    buttonElementInactive: 'form__save-btn_inactive',
    inputError: 'form__input_type_error',
    inputErrorActive: 'form__input-error_active'
}

export class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(validationConfig.formInput));
        this._buttonElement = this._formElement.querySelector(this._validationConfig.buttonElement);
    }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
      this._isValid(inputElement)
      this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });

  };

  _toggleButtonState () {
  if (this._hasInvalidInput()) {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._validationConfig.buttonElementInactive);
    this._buttonElement.classList.remove(this._validationConfig.buttonElement);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._validationConfig.buttonElementInactive);
      this._buttonElement.classList.add(this._validationConfig.buttonElement);
    }
  }

  _showError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.inputErrorActive);
  };
  
  _hideError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputError);
    errorElement.classList.remove(this._validationConfig.inputErrorActive);
  };

  deleteErrorMessage() {
    this._inputList.forEach((inputElement) => {
        this._hideError(inputElement);
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = '';
    });
    this._toggleButtonState(this._inputList, this._buttonElement); 
    }

  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage );
    } else {
      this._hideError(inputElement);
    }
  };

  enableValidation () {
    this._formElement.addEventListener('submit', (evt) => {
       evt.preventDefault();
     });
     this._setEventListeners();
 }

}