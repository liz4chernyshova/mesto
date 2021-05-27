<<<<<<< HEAD
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
    popupAvatar: 'popup-avatar',
    popupDelete: 'popup-delete',
    btnRedactor: document.querySelector('.profile__redactor-btn'),
    openAvatar: document.querySelector('.profile__avatar-container'),
    nameInput: popup.querySelector('input[name="heading"]'),
    jobInput: popup.querySelector('input[name="subheading"]'),
    userName: '.profile__info-name',
    userDesc: '.profile__info-description',
    btnAdd: document.querySelector('.profile__submit-btn'),
    photoElements: '.photo-elements',
    btnDelete: 'photo-element__delete-btn'
=======
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
>>>>>>> c0200c81512c5d20b017ee30c9fd1e04eafdcb77
}