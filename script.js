let overPopup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__redactor-btn');
let formElement = overPopup.querySelector('.popup__container');
let closePopup = overPopup.querySelector('.popup__close-btn');
let userName = document.querySelector('.profile__info-name');
let userDesc = document.querySelector('.profile__info-description');
let nameInput = formElement.querySelector('.popup__item-heading');
let jobInput = formElement.querySelector('.popup__item-subheading');
let uName = userName.textContent;
let uDesc = userDesc.textContent;

nameInput.setAttribute('value', uName);
jobInput.setAttribute('value', uDesc);

function showClick() {
   overPopup.classList.add('popup_opened');
}
function closeClick() {
   overPopup.classList.remove('popup_opened');
}
function formSubmitHandler (evt) {
   evt.preventDefault();
   userName.textContent = nameInput.value;
   userDesc.textContent = jobInput.value;
   closeClick();
}

formElement.addEventListener('submit', formSubmitHandler);
openPopup.addEventListener('click', showClick);
closePopup.addEventListener('click', closeClick);