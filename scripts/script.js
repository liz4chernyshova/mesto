let popup = document.querySelector('.popup');
let popupAdd = document.querySelector('.popup-add');
let popupPhoto = document.querySelector('.popup-photo');
console.log(popupPhoto);
let photoImage = popupPhoto.querySelector('.popup-photo__image');
let formAdd = popupAdd.querySelector('.form');
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

const initialCards = [
  {
    name: 'США',
    link: 'https://raw.githubusercontent.com/liz4chernyshova/mesto/main/images/elements/Chicago.jpg'
  },
  {
    name: 'Греция',
    link: 'https://raw.githubusercontent.com/liz4chernyshova/mesto/main/images/elements/Greece.jpg'
  },
  {
    name: 'Канада',
    link: 'https://raw.githubusercontent.com/liz4chernyshova/mesto/main/images/elements/Canada.jpg'
  },
  {
    name: 'Норвегия',
    link: 'https://raw.githubusercontent.com/liz4chernyshova/mesto/main/images/elements/Norway.jpg'
  },
  {
    name: 'Япония',
    link: 'https://raw.githubusercontent.com/liz4chernyshova/mesto/main/images/elements/Tokio.jpg'
  },
  {
    name: 'Швейцария',
    link: 'https://raw.githubusercontent.com/liz4chernyshova/mesto/main/images/elements/Swizerland.jpg'
  }
];

btnRedactor.addEventListener('click', showClick);
closePopup.addEventListener('click', closeClick);
formElement.addEventListener('submit', formSubmitHandler);
formAdd.addEventListener('submit', addElementCard);
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
  const elementTitle = newElement.querySelector('.photo-element__title');
  const elementDelete = newElement.querySelector('.photo-element__delete-btn');
  const elementLike = newElement.querySelector('.photo-element__like');

  elementTitle.textContent = card.name;
  elementPicture.alt = card.alt;
  elementPicture.src = card.link;
  elementLike.addEventListener('click', likeElement);
  elementDelete.addEventListener('click', deleteElement);
  elementPicture.addEventListener('click', () => openCard(card.link, card.name));
  return newElement;
 }

 function likeElement(evt) {
  evt.target.classList.toggle('photo-element__like_active');  //работает
}

function deleteElement(evt) {
  evt.target.closest('.photo-element').remove();  //работает
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
  photoElements.prepend(elementCard);
  closeAdd(popupAdd);
  formAdd.reset();
}

function openCard(link, alt) {
  photoImage.src = link;
  photoImage.alt = alt;
  photoTitle.textContent = alt;
  showPhoto(popupPhoto);
}

