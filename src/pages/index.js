import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupDeleteCard from '../components/PopupDeleteCard';
import {popupConfig, validationConfig, cardConfig} from '../utils/constants.js';
import {Api} from '../components/Api.js';


const popupRedactorValidate = new FormValidator(validationConfig, popupConfig.popupRedactor);
popupRedactorValidate.enableValidation();
const popupAddValidate = new FormValidator(validationConfig, popupConfig.popupAdd);
popupAddValidate.enableValidation();
const popupAvatarValidate = new FormValidator(validationConfig, popupConfig.popupAvatar);
popupAvatarValidate.enableValidation();
const popupImage = new PopupWithImage(popupConfig.popupPhoto);
const popupDeleteCard = new PopupDeleteCard(popupConfig.popupDelete);


const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization:'fad10afc-9b25-4889-84c7-ba30776ae655',
    'Content-Type': 'application/json',
  }
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, card]) => {
    userInfo.setUserInfo(userData);
    cards.renderItems(card);
  })
  .catch((err) => {
    console.log(err);
  });


const userInfo = new UserInfo(
  popupConfig.userName,
  popupConfig.userDesc,
  popupConfig.avatar
);

console.log(popupConfig.avatar)


const popupEditProfile = new PopupWithForm(
  popupConfig.popupRedactor, {
    handleFormSubmit: (userData) => {
      popupEditProfile.renderLoading(true);
      api.setUserInfo(userData.name, userData.about)
        .then(data => {
          userInfo.setUserInfo(data);
          popupEditProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupEditProfile.renderLoading(false);
      });
    }
});

popupConfig.btnRedactor.addEventListener('click', () => {
  popupConfig.nameInput.value = userInfo.getUserInfo().name;
  popupConfig.jobInput.value = userInfo.getUserInfo().about;
  popupRedactorValidate.resetValidation();
  popupEditProfile.open();
  }
);

const popupAvatar = new PopupWithForm(
  popupConfig.popupAvatar, {
  handleFormSubmit: (formData) => {
      popupAvatar.renderLoading(true);
      api.popupEditAvatar(formData.link)
          .then((result) => {
              userInfo.setUserInfo(result);
              popupAvatar.close();
          })
          .catch((err) => {
              console.log(err);
          })
          .finally(() => {
              popupAvatar.renderLoading(false);
          });
  }
});


popupConfig.openAvatar.addEventListener('click', () => {
  popupAvatar.open();
  popupAvatarValidate.resetValidation();
});



const cards = new Section((item) =>{
  const image = createCard(item);
  cards.addItem(image);
}, 
popupConfig.photoElements);


function createCard(item) {
  const userId = userInfo.getUserId()
  const element = new Card(item, {
    openImage: (link, alt) => {
      popupImage.open(link, alt);
    },
    deleteElement: () => {
      popupDeleteCard.open(() => {
       api.deleteCard(element.getId())
        .then(() => {
          element.handleRemoveCard()
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
      });
    },
    functionLike: (cardElement) => {
      if (cardElement.querySelector(cardConfig.elementLike).classList.contains(cardConfig.elementLikeActive)) {
        api.unLikeCard(cardElement.id)
          .then(result => element.deleteLike(cardElement, result.likes))
          .catch((err) => {
            console.log(err);
        });
      } else {
        api.likeCard(cardElement.id)
          .then(result => element.addLike(cardElement, result.likes))
          .catch((err) => {
            console.log(err);
        });
      }
    }
  }, '#template-element', userId);
  const card = element.generateCard();
  return card;
}


const popupAddCard = new PopupWithForm(
  popupConfig.popupAdd, {
    handleFormSubmit: (data) => {
    popupAddCard.renderLoading(true);
    api.addCard(data)
      .then(result => {
        cards.addItem(createCard(result));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddCard.renderLoading(false);
      })
  }
});

popupConfig.btnAdd.addEventListener("click", () => {
  popupAddCard.open();
  popupAddValidate.resetValidation();
});


popupDeleteCard.setEventListeners();
popupAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();