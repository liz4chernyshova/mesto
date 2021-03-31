let popup = document.querySelector('.popup');
let popupAdd = document.querySelector('.popup-add');
let popupPhoto = document.querySelector('.popup-photo');
let photoImage = popupPhoto.querySelector('.popup-photo__image');
let form = popupAdd.querySelector('.form');
let btnPhoto = popupPhoto.querySelector('.popup-photo__button');
let photoTitle = popupPhoto.querySelector('.popup-photo__title');
let formElement = popup.querySelector('.popup__container');
let btnRedactor = document.querySelector('.profile__redactor-btn');
let closePopup = popup.querySelector('.popup__close-btn');
let nameInput = popup.querySelector('input[name="heading"]');
let jobInput = popup.querySelector('input[name="subheading"]');
let nameCard = popupAdd.querySelector('input[name="name"]');
let linkCard = popupAdd.querySelector('input[name="link"]');
let userName = document.querySelector('.profile__info-name');
let userDesc = document.querySelector('.profile__info-description');
let btnAdd = document.querySelector('.profile__submit-btn');
let btnAddClose = popupAdd.querySelector('.popup-add__close-btn');
const photoElements = document.querySelector('.photo-elements');
console.log(photoElements);

const initialCards = [
  {
    name: 'Канада',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'США',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Греция',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Норвегия',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Япония',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Швейцария',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
];

btnRedactor.addEventListener('click', showClick);
closePopup.addEventListener('click', closeClick);
formElement.addEventListener('submit', formSubmitHandler);
btnAdd.addEventListener('click', addClick);
btnAddClose.addEventListener('click', closeAdd);
btnPhoto.addEventListener('click', () => closePhoto());

function showClick() {
  popup.classList.add('popup_opened');  //работает
  nameInput.value = userName.textContent;
  jobInput.value = userDesc.textContent;
}
function closeClick() {
  popup.classList.remove('popup_opened'); //работает
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;  //работает
  userDesc.textContent = jobInput.value;
  closeClick();
}
function addClick() {
  popupAdd.classList.add('popup_opened');  //работает
}
function closeAdd() {
  popupAdd.classList.remove('popup_opened');  //работает
}

function deleteElement() {
  const listItem = elementDel.closest('.photo-element');
  listItem.remove();
}

function showPhoto() {
  popupPhoto.classList.add('popup_opened');
}

function closePhoto() {
  popupPhoto.classList.remove('popup_opened');
}

function addElement(card) {
  const templateElements = document.querySelector('#template-element').content;
  const newElement = templateElements.querySelector('.photo-element').cloneNode(true);
  const elementPicture = newElement.querySelector('.photo-element__picture');
  const elementContent = newElement.querySelector('.photo-element__content');
  const elementTitle = newElement.querySelector('.photo-element__title');
  const elementDel = newElement.querySelector('.photo-element__delete-btn');

  elementTitle.textContent = card.name;
  elementPicture.alt = card.name;
  elementPicture.src = card.link;
  return newElement;
 }
 
 function openElement() {
   const inCards = initialCards.map(card => {
     const newElement = addElement(card);
     return newElement;
   });
   photoElements.prepend(...inCards);
 }

openElement();


function addElementCard(evt) {
  evt.preventDefault();
  const elementCard = addElement({name: nameCard.value, link: linkCard.value});
  photoElements.prepend(...elementCard);
  closeAdd(popupAdd);
}

function openCard(link, alt) {
  photoImage.src = link;
  photoImage.alt = alt;
  photoTitle.textContent = alt;
  showPhoto(popupPhoto);
}

