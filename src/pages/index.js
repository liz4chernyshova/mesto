<<<<<<< HEAD
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
import {Api} from '../components/Api.js';


const popupRedactorValidate = new FormValidator(validationConfig, popupConfig.popupRedactor);
popupRedactorValidate.enableValidation();
const popupAddValidate = new FormValidator(validationConfig, popupConfig.popupAdd);
popupAddValidate.enableValidation();
//const popupAvatarValidate = new FormValidator(validationConfig, popupConfig.popupAvatar);
//popupAvatarValidate.enableValidation();
const popupImage = new PopupWithImage(popupConfig.popupPhoto);
let userId = null;

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization:'fad10afc-9b25-4889-84c7-ba30776ae655',
    'Content-Type': 'application/json',
  }
})



//загрузка данных пользователя с сервера
/*api.getUserInfo()
    .then((userData) => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
    })
    .catch((err) => {
        console.log(err);
    });*/

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

const popupEditProfile = new PopupWithForm(
  popupConfig.popupRedactor, {
    handleFormSubmit: (data) => {
      api.setUserInfo(data)
      .then((data) => {
          userInfo.setUserInfo(data);
      })
      .catch((err) => {
          console.log(err);
      })
  },
});

popupConfig.btnRedactor.addEventListener('click', getInfo);



//Отрисовка карточек
/*const cards = new Section ({
  items: initialCards,
  renderer: (item) => {
    cards.addItem(createCard(item));
  },
}, popupConfig.photoElements);*/

const cards = new Section((item) =>{
  const image = createCard(item);
  cards.addItem(image);
}, popupConfig.photoElements);

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        userId = userData;
        userInfo.setUserInfo(userData.name, userData.about);
        cards.renderItems(initialCards);
    })
    .catch((error) => console.log(error));

const createCard = (item) => {
  const card = new Card(item, () => popupImage.open(item.link, item.name), '#template-element');
  return card.generateCard();
};

/*api.getInitialCards()
    .then((item) => {
        cards.renderItems(item);
    })
    .catch((err) => {
        console.log(err);
    });*/
  


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

const popupEditAvatar = new PopupWithForm(
  popupConfig.popupAvatar, {
  handleFormSubmit: (formData) => {
      api.popupEditAvatar(formData)
          .then((formData) => {
              userInfo.setUserInfo(formData);
          })
          .catch((err) => {
              console.log(err);
          })
  },
});

popupConfig.openAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
  //popupAvatarValidate.deleteErrorMessage();
})


popupEditAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
=======
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
>>>>>>> c0200c81512c5d20b017ee30c9fd1e04eafdcb77
popupImage.setEventListeners();