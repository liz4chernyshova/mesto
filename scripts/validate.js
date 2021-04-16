const validationConfig = {
  formSelector: '.form',
  formInput: '.form__input',
  buttonElement: '.form__save-btn',
  buttonElementInactive: 'form__save-btn_inactive',
  inputError: 'form__input_type_error',
  inputErrorActive: 'form__input-error_active'
}

const showError = (formSelector, formInput, errorMessage) => {
  const formError = formSelector.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(validationConfig.inputError);
  formError.textContent = errorMessage;
  formError.classList.add(validationConfig.inputErrorActive);
};


const hideError = (formSelector, formInput) => {
  const formError = formSelector.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(validationConfig.inputError);
  formError.classList.remove(validationConfig.inputErrorActive);
  formError.textContent = '';
};

const isValid = (formSelector, formInput) => {
  if (!formInput.validity.valid) {
    showError(formSelector, formInput, formInput.validationMessage);
  } else {
    hideError(formSelector, formInput);
  }
};

const setEventListeners = (formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll(validationConfig.formInput));
  const buttonElement = formSelector.querySelector(validationConfig.buttonElement);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formSelector, formInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formSelector);
  });
};
enableValidation(validationConfig);

const hasInvalidInput = (inputList) => { 
  return inputList.some((formInput) => { 
    return !formInput.validity.valid; 
  }) 
};

const toggleButtonState = (inputList, buttonElement) => { 
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.remove(validationConfig.buttonElement); 
    buttonElement.classList.add(validationConfig.buttonElementInactive);
    buttonElement.setAttribute('disabled', true);
  } else { 
    buttonElement.classList.remove(validationConfig.buttonElementInactive); 
    buttonElement.classList.add(validationConfig.buttonElement); 
    buttonElement.removeAttribute('disabled'); 
  } 
};

const deleteErrorMessage = (validateConfig) => {
  const errorList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  errorList.forEach(formElement => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.formInput));
    inputList.forEach(inputElement => {
      hideError(formElement, inputElement, validateConfig);
    });
    const submitElement = formElement.querySelector(validationConfig.buttonElement);
    toggleButtonState(inputList, submitElement, validateConfig);
  });
};