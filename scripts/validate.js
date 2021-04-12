const validationConfig = {
  formElement: '.form',
  formInput: '.form__input',
  buttonElement: '.form__save-btn',
  buttonElementInactive: 'form__save-btn_inactive',
  inputError: 'form__input_type_error',
  inputErrorActive: 'form__input-error_active'
}

const showError = (formElement, formInput, errorMessage) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(validationConfig.inputError);
  formError.textContent = errorMessage;
  formError.classList.add(validationConfig.inputErrorActive);
};


const hideError = (formElement, formInput) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(validationConfig.inputError);
  formError.classList.remove(validationConfig.inputErrorActive);
  formError.textContent = '';
};

const isValid = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    showError(formElement, formInput, formInput.validationMessage);
  } else {
    hideError(formElement, formInput);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.formInput));
  const buttonElement = formElement.querySelector(validationConfig.buttonElement);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formElement, formInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formElement));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
enableValidation();

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