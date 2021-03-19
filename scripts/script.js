let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let btnRedactor = document.querySelector('.profile__redactor-btn');
let closePopup = popup.querySelector('.popup__close-btn');
let nameInput = popup.querySelector('input[name="heading"]');
let jobInput = popup.querySelector('input[name="subheading"]');
let userName = document.querySelector('.profile__info-name');
let userDesc = document.querySelector('.profile__info-description');

function showClick() {
   popup.classList.add('popup_opened');
   nameInput.value = userName.textContent;
   jobInput.value = userDesc.textContent;
}
function closeClick() {
   popup.classList.remove('popup_opened');
}
function formSubmitHandler (evt) {
   evt.preventDefault();
   userName.textContent = nameInput.value;
   userDesc.textContent = jobInput.value;
   closeClick();
}

btnRedactor.addEventListener('click', showClick);
closePopup.addEventListener('click', closeClick);
formElement.addEventListener('submit', formSubmitHandler);