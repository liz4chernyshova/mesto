export { validationConfig, popupConfig };

const validationConfig = {
    formSelector: '.form',
    formInput: '.form__input',
    buttonElement: '.form__save-btn',
    buttonElementInactive: 'form__save-btn_inactive',
    inputError: 'form__input_type_error',
    inputErrorActive: 'form__input-error_active'
}

const popupConfig = {
    popup:  document.querySelectorAll('.popup'),
    buttonClose:  '.popup__close-btn',
    popupAdd: '.popup-add',
    popupRedactor: '.popup-redactor',
    popupPhoto: '.popup-photo',
    btnRedactor: document.querySelector('.profile__redactor-btn'),
    nameInput: popup.querySelector('input[name="heading"]'),
    jobInput: popup.querySelector('input[name="subheading"]'),
    userName: '.profile__info-name',
    userDesc: '.profile__info-description',
    btnAdd: document.querySelector('.profile__submit-btn'),
    photoElements: '.photo-elements'
}