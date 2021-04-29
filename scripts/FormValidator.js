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
    }

    _hasInvalidInput(inputList) { 
        return this._inputList.some((inputElement) => { 
          return !inputElement.validity.valid; 
        }) 
    }

    _showError(formInput) {
        const formError = this._formElement.querySelector(`.${formInput.id}-error`);
        formInput.classList.add(this._validationConfig.inputError);
        formError.textContent = errorMessage;
        formError.classList.add(this._validationConfig.inputErrorActive);
    }

    _hideError(formInput) {
        const formError = this._formSelector.querySelector(`.${formInput.id}-error`);
        formInput.classList.remove(this._validationConfig.inputError);
        formError.classList.remove(this._validationConfig.inputErrorActive);
        formError.textContent = '';
    }

    _isValid(formInput) {
        if (!formInput.validity.valid) {
            this._showError(formInput, formInput.validationMessage);
        } else {
            this._hideError(formInput);
        }
    }

    _toggleButtonState(inputList, buttonElement) { 
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.remove(this._validationConfig.buttonElement); 
            buttonElement.classList.add(this._validationConfig.buttonElementInactive);
            buttonElement.setAttribute('disabled', true);
        } else { 
            buttonElement.classList.remove(this._validationConfig.buttonElementInactive); 
            buttonElement.classList.add(this._validationConfig.buttonElement); 
            buttonElement.removeAttribute('disabled'); 
        } 
      }

    _setEventListeners(formSelector) {
        this._inputList.forEach((formInput) => {
          formInput.addEventListener('input', () => {
            this._isValid(formSelector, formInput);
            this._toggleButtonState(inputList, buttonElement);
          });
        });
    }

    /*_deleteErrorMessage(validateConfig) {
        const errorList = Array.from(document.querySelectorAll(this._validationConfig.formSelector));
        errorList.forEach(formElement => {
          const inputList = Array.from(formElement.querySelectorAll(this._validationConfig.formInput));
          inputList.forEach(inputElement => {
            this._hideError(formElement, inputElement, validateConfig);
          });
          const submitElement = formElement.querySelector(this._validationConfig.buttonElement);
          this._toggleButtonState(inputList, submitElement, validateConfig);
        });
    }*/

    enableValidation() {
        this._setEventListeners();
    }
}