import {Card} from './Card.js';
import {initialCards} from './initial-cards.js';
import {FormValidator} from './FormValidator.js';
import {validationConfig} from './FormValidator.js';

const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup-add');
const popupRedactor = document.querySelector('.popup-redactor');
const popupPhoto = document.querySelector('.popup-photo');
const photoImage = popupPhoto.querySelector('.popup-photo__image');
const popupAddElement = popupAdd.querySelector('.form');
const btnPhoto = popupPhoto.querySelector('.popup-photo__button');
const photoTitle = popupPhoto.querySelector('.popup-photo__title');
const popupElement = popup.querySelector('.popup__container');
const btnRedactor = document.querySelector('.profile__redactor-btn');
const popupClose = popup.querySelector('.popup__close-btn');
const nameInput = popup.querySelector('input[name="heading"]');
const jobInput = popup.querySelector('input[name="subheading"]');
const nameCard = popupAdd.querySelector('input[name="name"]');
const linkCard = popupAdd.querySelector('input[name="link"]');
const userName = document.querySelector('.profile__info-name');
const userDesc = document.querySelector('.profile__info-description');
const btnAdd = document.querySelector('.profile__submit-btn');
const btnAddClose = popupAdd.querySelector('.popup-add__close-btn');
const photoElements = document.querySelector('.photo-elements');

btnRedactor.addEventListener('click', () => closeEditProfilePopup(popup));
popupClose.addEventListener('click',() => closePopup(popup));
popupElement.addEventListener('submit', submitEditProfileForm);
popupAddElement.addEventListener('submit', submitAddCardForm);
btnAdd.addEventListener('click', () =>  handlePopupAdd(popupAdd));
btnAddClose.addEventListener('click', () => closePopup(popupAdd));
btnPhoto.addEventListener('click', () => closePopup(popupPhoto));

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keydownEscape);
  document.addEventListener('click', popupCloseClick);
  new FormValidator(validationConfig, popupRedactor).enableValidation();
}

function popupCloseClick(evt) {
  if(evt.target.classList.contains('popup')) {
    const modal = document.querySelector('.popup_opened');
    closePopup(modal);
  }
}

function  handlePopupAdd() {
  popupAddElement.reset();
  openPopup(popupAdd);
}

function keydownEscape(evt) {
  if(evt.key === 'Escape') {
    const modalPopup = document.querySelector('.popup_opened');
    closePopup(modalPopup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownEscape);
  document.removeEventListener('click', popupCloseClick);
}

function closeEditProfilePopup(popup) {
  nameInput.value = userName.textContent;
  jobInput.value = userDesc.textContent;
  openPopup(popup);
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDesc.textContent = jobInput.value;
  closePopup(popup);
}

function createCard(item) {
  const element = new Card(item, openCard, '#template-element');
  const card = element.generateCard();
  return card;
 }
 
function renderInitialCards() { //создает карточки из initial-card, на класс Card не влияет
   const cards = initialCards.map(card => {
     const newElement = createCard(card);
     return newElement;
   });
   photoElements.prepend(...cards);
 }

 renderInitialCards();


function submitAddCardForm(evt) {
  evt.preventDefault();
  const elementCard = createCard({name: nameCard.value, link: linkCard.value});
  photoElements.prepend(elementCard);
  closePopup(popupAdd);
  popupAddElement.reset();
}

function openCard(link, alt) {
  photoImage.src = link;
  photoImage.alt = alt;
  photoTitle.textContent = alt;
  openPopup(popupPhoto);
}