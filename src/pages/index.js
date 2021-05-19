import './index.css';
import {Card} from '../components/Card.js';
import {initialCards} from '../utils/initial-cards.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {popupConfig} from '../utils/constants.js';
import {validationConfig} from '../utils/constants.js';


const popupRedactorValidate = new FormValidator(validationConfig, popupConfig.popupRedactor);
popupRedactorValidate.enableValidation();
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
              name: data['name'],
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
      userInfo.setUserInfo(data);
      popupEditProfile.close();
  },
});

const userInfo = new UserInfo(
  popupConfig.userName,
  popupConfig.userDesc,
);


const getInfo = () => {
  const profileInfo = userInfo.getUserInfo();
  popupConfig.nameInput.value = profileInfo.heading;
  popupConfig.jobInput.value = profileInfo.subheading;
  popupRedactorValidate.deleteErrorMessage();
  popupEditProfile.open();
};


popupConfig.btnRedactor.addEventListener('click', getInfo);


popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();