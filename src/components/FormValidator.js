export class FormValidator { 
  constructor(validationConfig, formElement) { 
      this._validationConfig = validationConfig; 
      this._formElement = document.querySelector(formElement); 
      this._inputList = Array.from(this._formElement.querySelectorAll(validationConfig.formInput)); 
      this._buttonElement = this._formElement.querySelector(this._validationConfig.buttonElement); 
  } 

_hasInvalidInput() { 
  return this._inputList.some((inputElement) => { 
    return !inputElement.validity.valid; 
  }) 
} 

_setEventListeners() { 
  this._toggleButtonState(); 
  this._inputList.forEach((inputElement) => { 
      inputElement.addEventListener('input', () => { 
    this._isValid(inputElement) 
    this._toggleButtonState(); 
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
  const errorElement = inputElement.nextElementSibling; 
  inputElement.classList.add(this._validationConfig.inputError); 
  errorElement.textContent = errorMessage; 
  errorElement.classList.add(this._validationConfig.inputErrorActive); 
}; 
 
_hideError (inputElement) { 
  const errorElement = inputElement.nextElementSibling; 
  inputElement.classList.remove(this._validationConfig.inputError); 
  errorElement.classList.remove(this._validationConfig.inputErrorActive); 
};

resetValidation() { 
    this._inputList.forEach((inputElement) => { 
        this._hideError(inputElement); 
        const errorElement = inputElement.nextElementSibling;  
    }); 
    this._toggleButtonState();  
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