const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup-add');
const popupPhoto = document.querySelector('.popup-photo');
const photoImage = popupPhoto.querySelector('.popup-photo__image');
const formAdd = popupAdd.querySelector('.form');
const btnPhoto = popupPhoto.querySelector('.popup-photo__button');
const photoTitle = popupPhoto.querySelector('.popup-photo__title');
const formElement = popup.querySelector('.popup__container');
const btnRedactor = document.querySelector('.profile__redactor-btn');
const closePopup = popup.querySelector('.popup__close-btn');
const nameInput = popup.querySelector('input[name="heading"]');
const jobInput = popup.querySelector('input[name="subheading"]');
const nameCard = popupAdd.querySelector('input[name="name"]');
const linkCard = popupAdd.querySelector('input[name="link"]');
const userName = document.querySelector('.profile__info-name');
const userDesc = document.querySelector('.profile__info-description');
const btnAdd = document.querySelector('.profile__submit-btn');
const btnAddClose = popupAdd.querySelector('.popup-add__close-btn');
const photoElements = document.querySelector('.photo-elements');

const initialCards = [
  {
    name: 'США',
    link: 'https://raw.githubusercontent.com/liz4chernyshova/mesto/main/images/elements/New-York.jpg'
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

btnRedactor.addEventListener('click', () => editPopupOpen(popup));
closePopup.addEventListener('click',() => popupClose(popup));
formElement.addEventListener('submit', formSubmitHandler);
formAdd.addEventListener('submit', addElementCard);
btnAdd.addEventListener('click', () =>  openPopup(popupAdd));
btnAddClose.addEventListener('click', () => popupClose(popupAdd));
btnPhoto.addEventListener('click', () => popupClose(popupPhoto));

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function popupClose(popup) {
  popup.classList.remove('popup_opened');
}
function editPopupOpen(popup) {
  nameInput.value = userName.textContent;
  jobInput.value = userDesc.textContent;
  openPopup(popup);
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDesc.textContent = jobInput.value;
  popupClose(popup);
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
  evt.target.classList.toggle('photo-element__like_active');
}

function deleteElement(evt) {
  evt.target.closest('.photo-element').remove();
}
 
 function createCard() {
   const inCards = initialCards.map(card => {
     const newElement = addElement(card);
     return newElement;
   });
   photoElements.prepend(...inCards);
 }

createCard();


function addElementCard(evt) {
  evt.preventDefault();
  const elementCard = addElement({name: nameCard.value, link: linkCard.value});
  photoElements.prepend(elementCard);
  popupClose(popupAdd);
  formAdd.reset();
}

function openCard(link, alt) {
  photoImage.src = link;
  photoImage.alt = alt;
  photoTitle.textContent = alt;
  openPopup(popupPhoto);
}