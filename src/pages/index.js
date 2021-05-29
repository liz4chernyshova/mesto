import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupDeleteCard from '../components/popupDeleteCard';
import {popupConfig} from '../utils/constants.js';
import {validationConfig} from '../utils/constants.js';
import {Api} from '../components/Api.js';


const popupRedactorValidate = new FormValidator(validationConfig, popupConfig.popupRedactor);
popupRedactorValidate.enableValidation();
const popupAddValidate = new FormValidator(validationConfig, popupConfig.popupAdd);
popupAddValidate.enableValidation();
const popupAvatarValidate = new FormValidator(validationConfig, popupConfig.popupAvatar);
popupAvatarValidate.enableValidation();
const popupImage = new PopupWithImage(popupConfig.popupPhoto);


const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization:'fad10afc-9b25-4889-84c7-ba30776ae655',
    'Content-Type': 'application/json',
  }
})


const userInfo = new UserInfo(
  popupConfig.userName,
  popupConfig.userDesc,
  popupConfig.avatar
);

api.getUserInfo()
    .then((userData) => {
        userInfo.setUserInfo(userData);
    })
    .catch((err) => {
        console.log(err);
    });


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
  popupRedactorValidate.enableValidation();
  popupEditProfile.open();
  }
);



const cards = new Section((item) =>{
  const image = createCard(item);
  cards.addItem(image);
}, 
popupConfig.photoElements);


api.getInitialCards()
    .then((card) => {
        cards.renderItems(card);
    })
    .catch((err) => {
        console.log(err);
    });

function createCard(item) {
  const userId = userInfo.getUserId()
  const element = new Card(item, {
    openImage: (link, alt) => {
      popupImage.open({link, alt});
    },
    deleteElement: (cardItem, cardId) => {
      popupDeleteCard.open(cardItem, cardId)
    },
    functionLike: (cardId) => {
      if (cardId.querySelector('.photo-element__like').classList.contains('.photo-element__like_active')) {
        api.unlikeCard(cardId.id)
          .then(result => element.deleteLike(cardId, result.likes))
          .catch((err) => {
            console.log(err);
        });
      } else {
        api.likeCard(cardId.id)
          .then(result => element.addLike(cardId, result.likes))
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
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddCard.renderLoading(false);
      })
    popupAddCard.close();
  }
});

popupConfig.btnAdd.addEventListener("click", () => {
  popupAddCard.open();
  popupAddValidate.deleteErrorMessage();
});

/*const popupEditAvatar = new PopupWithForm(
  popupConfig.popupAvatar, {
  handleFormSubmit: (data) => {
      api.popupEditAvatar(data.avatar)
          .then((result) => {
            userInfo.setUserAvatar(result.avatar);
            popupEditAvatar.close();
          })
          .catch((err) => {
              console.log(err);
          })
  },
});*/

const popupAvatar = new PopupWithForm(
  popupConfig.popupAvatar, {
  handleFormSubmit: (formData) => {
      popupAvatar.renderLoading(true);
      api.popupEditAvatar(formData.avatar)
          .then((result) => {
              userInfo.setUserAvatar(result.avatar);
              popupAvatar.close();
          })
          .catch((err) => {
              console.log(err);
          })
          .finally(() => {
              popupAvatar.renderLoading(false);
          });
  },
});


popupConfig.openAvatar.addEventListener('click', () => {
  popupAvatar.open();
  popupAvatarValidate.deleteErrorMessage();
});


const popupDeleteCard = new PopupDeleteCard(
  popupConfig.popupDelete, {
  handleFormSubmit: () => {
    api.deleteCard(popupDeleteCard.cardId().id)
      .then(() => {
        popupDeleteCard.cardId().remove();
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
})

//popupConfig.btnDelete.addEventListener('click', popupDeleteCard.open());


popupDeleteCard.setEventListeners();
popupAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();