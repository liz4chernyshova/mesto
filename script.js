let overPopup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__redactor-btn');
let formElement = overPopup.querySelector('.popup__container');
let closePopup = document.querySelector('.form__close-btn');
let userName = document.querySelector('.profile__info-name');
let userDesc = document.querySelector('.profile__info-description');
let nameInput = formElement.querySelector('.form__item_el_heading');
let jobInput = formElement.querySelector('.form__item_el_subheading');
let uName = userName.textContent;
let uDesc = userDesc.textContent;

nameInput.setAttribute('value', uName);
jobInput.setAttribute('value', uDesc);

function showClick() {
   overPopup.classList.add('popup__opened');
   formElement.classList.add('popup__opened');
}
function closeClick() {
   overPopup.classList.remove('popup__opened');
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