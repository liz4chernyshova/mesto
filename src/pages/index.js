//import '../pages/index.css';
import {Card} from '../components/Card.js';
import {initialCards} from '../components/initial-cards.js';
import {FormValidator} from '../components/FormValidator.js';
import {validationConfig} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {popupConfig} from '../components/constants.js';


const popupRedactorValidate = new FormValidator(validationConfig, popupConfig.popupRedactor);
const popupAddValidate = new FormValidator(validationConfig, popupConfig.popupAdd);
popupAddValidate.enableValidation();
const popupImage = new PopupWithImage(popupConfig.popupPhoto);

const createCard = (item) => {
  const card = new Card(item, () => popupImage.open(item.link, item.name), '#template-element');
  return card.generateCard();
};

const cards = new Section ({
  items: initialCards,
  renderer: (item) => {
    cards.addItem(createCard(item));
  },
}, popupConfig.photoElements);
cards.renderItems();


const popupAddCard = new PopupWithForm(
  popupConfig.popupAdd, {
    handleFormSubmit: (data) => {
      cards.addItem(
          createCard({
              alt: data['text'],
              link: data['link'],
          })
      );
      popupAddCard.close();
  },
});

popupConfig.btnAdd.addEventListener("click", () => {
  popupAddCard.open();
  popupAddValidate.deleteErrorMessage();
});

const popupEditProfile = new PopupWithForm(
  popupConfig.popupRedactor, {
    handleFormSubmit: (data) => {
      userInfo.setUserInfo({
          userName: data['title'],
          userDescription: data['subtitle'],
      });
      popupEditProfile.close();
  },
});

const userInfo = new UserInfo({
  userName: popupConfig.userName,
  userDescription: popupConfig.userDesc,
});

const getInfo = () => {
  const profileInfo = userInfo.getUserInfo();
  popupConfig.nameInput.value = profileInfo.name;
  popupConfig.jobInput.value = profileInfo.description;
  popupRedactorValidate.deleteErrorMessage();
  popupEditProfile.open();
};


popupConfig.btnRedactor.addEventListener('click', getInfo);


popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

/*function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keydownEscape);
  document.addEventListener('click', popupCloseClick);
  new FormValidator(validationConfig, popupRedactor).enableValidation();
  new FormValidator(validationConfig, popupAdd).enableValidation();
}*/

/*function popupCloseClick(evt) {
  if(evt.target.classList.contains('popup')) {
    const modal = document.querySelector('.popup_opened');
    closePopup(modal);
  }
}*/

/*function  handlePopupAdd() {
  popupAddElement.reset();
  openPopup(popupAdd);
}*/

/*function keydownEscape(evt) {
  if(evt.key === 'Escape') {
    const modalPopup = document.querySelector('.popup_opened');
    closePopup(modalPopup);
  }
}*/

/*function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownEscape);
  document.removeEventListener('click', popupCloseClick);
  popupRedactorValidate.deleteErrorMessage();
  popupAddValidate.deleteErrorMessage();
}*/


/*function closeEditProfilePopup(popup) {
  nameInput.value = userName.textContent;
  jobInput.value = userDesc.textContent;
  openPopup(popup);
}*/

/*function submitEditProfileForm(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDesc.textContent = jobInput.value;
  closePopup(popup);
}*/

/*function createCard(item) {
  const element = new Card(item, openCard, '#template-element');
  const card = element.generateCard();
  return card;
 }
 
function renderInitialCards() {
   const cards = initialCards.map(card => {
     const newElement = createCard(card);
     return newElement;
   });
   photoElements.prepend(...cards);
 }

 renderInitialCards();*/


/*function submitAddCardForm(evt) {
  evt.preventDefault();
  const elementCard = createCard({name: nameCard.value, link: linkCard.value});
  photoElements.prepend(elementCard);
  //closePopup(popupAdd);
  popupAddElement.reset();
}*/

/*function openCard(link, alt) {
  photoImage.src = link;
  photoImage.alt = alt;
  photoTitle.textContent = alt;
  //openPopup(popupPhoto);
}*/