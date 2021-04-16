const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup-add');
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
btnAdd.addEventListener('click', () =>  openPopup(popupAdd));
btnAddClose.addEventListener('click', () => closePopup(popupAdd));
btnPhoto.addEventListener('click', () => closePopup(popupPhoto));
document.addEventListener('click', popupCloseClick);
document.addEventListener('keydown', keydownEscape);


function openPopup(popup) {
  popup.classList.add('popup_opened');
  popupAddElement.reset();
  deleteErrorMessage();
}

function popupCloseClick(evt) {
  if(evt.target.classList.contains('popup')) {
    const modal = document.querySelector('.popup_opened');
    closePopup(modal);
  }
}

function keydownEscape(evt) {
  if(evt.key === 'Escape') {
    const modalPopup = document.querySelector('.popup_opened');
    closePopup(modalPopup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

function createCard(card) {
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
 
 function renderInitialCards() {
   const inCards = initialCards.map(card => {
     const newElement = createCard(card);
     return newElement;
   });
   photoElements.prepend(...inCards);
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