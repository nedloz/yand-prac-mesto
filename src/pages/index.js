import './index.css';

import Section from '../components/Section';
import Card from '../components/Card'
import FormValidator from '../components/FormValidator';
import PopupWithImage from '../components/PopupWithImage.js'; 
import PopupWithForm from '../components/PopupWithForm';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api';

import {
  config, 
  profilePopupSelector, cardPopupSelector, updateAvatarPopupSelector, confirmPopupSelector,
  imagePopupSelector, cardTemplateSelector, 
  profileNameSelector, profileDescriptionSelector, 
  profileImagePlace, 
  avatarEditButton, profileEditButton, profileAddButton, popupButton,
  cardsContainerSelector, container
} from '../utils/Constants';


const formValidators = {};
const formList = Array.from(document.querySelectorAll(config.formSelector));

formList.forEach((form) => {
  const validator = new FormValidator(config, form);
  const formName = form.getAttribute('name');
  formValidators[formName] = validator;
})

const enableValidation = () => {
  formList.forEach((form) => {
    const formName = form.getAttribute('name')
    formValidators[formName].enableValidation()
  })
}

const setCards = (items, userID) => {
  const section = createSection(userID)
  section.renderItems(items)
}

const setProfileInfo = (Info) => {
  userInfo.setUserInfo(Info)
  userInfo.setUserImage(Info.avatar)
}

const handleAddButtonClick = () => {
  formValidators['card-form'].resetValidation()
  cardPopup.open()
}
const handleProfileEditButtonClick = () => {
  const oldUserInfo = userInfo.getUserInfo()
  profilePopup.setInputValues(oldUserInfo)
  profilePopup.open()
}
const handleAvatarEditButtonClick = () => {
  formValidators['update-avatar-form'].resetValidation()
  updateAvatarPopup.open()
}

const handleCardClick = (src, name) => {
  imgPopup.open(src, name);
}

const handleLikeClick = (likeState, cardId, cardClass) => {
  if (likeState) {
    api.setLike(cardId)
      .then(res => {cardClass._getLikes(res.likes)})
      .catch(err => console.log(err))

  } else {
    api.removeLike(cardId)
      .then(res => {cardClass._getLikes(res.likes)})
      .catch(err => console.log(err))
  }
}

const handleTrashClick = (cardId) => {
  confirmPopup.open(cardId)
}

const createCard = (item, userID) => { 
  const card = new Card(item, userID, cardTemplateSelector, handleCardClick, handleTrashClick, handleLikeClick);
  const cardEl = card.generateCard();
  return cardEl
}

const getNewCard = (data) => {
  api.sendNewCard(data)
  .then((data) => {
    // getUserInfo.then((res) => {
      const newCard = createCard(data, userID)
      container.prepend(newCard)
    // })
  })
  .then(cardPopup.close())
  .catch(err => console.log(err))
  .finally(cardPopup.renderLoading(false))
}

const setUserInfo = (data) => {
  api.sendUserInfo(data)
    .then(userInfo.setUserInfo(data))
    .then(profilePopup.close())
    .catch(err => console.log(err))
    .finally(profilePopup.renderLoading(false))
}

const setAvatarImage = (link) => {
  api.sendUserAvatar(link)
    .then(res => setProfileInfo(res))
    .then(updateAvatarPopup.close())
    .catch(err => console.log(err))
    .finally(updateAvatarPopup.renderLoading(false))
}

const deleteCard = (cardId) => {
    api.deleteCard(cardId)
      .then((res) => setDefaultCards(res._id))
      .catch(err => console.log(err))
}

const confirmPopup =  new PopupWithConfirmation(confirmPopupSelector, popupButton, deleteCard)
const updateAvatarPopup = new PopupWithForm(updateAvatarPopupSelector, setAvatarImage)
const profilePopup = new PopupWithForm(profilePopupSelector, setUserInfo);
const cardPopup = new PopupWithForm(cardPopupSelector, getNewCard);
const imgPopup = new PopupWithImage(imagePopupSelector);
const userInfo = new UserInfo({name: profileNameSelector, description: profileDescriptionSelector, image: profileImagePlace});

const createSection = (userID) => { 
  const section = new Section({
    renderer: (data) => {
      const newCard = createCard(data, userID)
      section.addItem(newCard)
    }
  }, cardsContainerSelector)
  return section
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-57',
  headers: {
    authorization: 'dbacfcec-34ad-4656-89f8-d0ca1da81c55',
    'Content-Type': 'application/json'
  }
})

avatarEditButton.addEventListener('click', handleAvatarEditButtonClick)
profileEditButton.addEventListener('click', handleProfileEditButtonClick)
profileAddButton.addEventListener('click', handleAddButtonClick)

const setDefaultCards = (userID) => {
  api.getCardsinfo()
  .then(res => setCards(res, userID))
  .catch(err => console.log(err))
}

// const getUserInfo = api.getUserInfo()
//   .catch(err => console.log(err))

// getUserInfo 
//   .then(res => { 
//     setProfileInfo(res)
//     setDefaultCards(res._id)
//   })
//   .catch(err => console.log(err))

let userID
Promise.all([api.getUserInfo(), api.getCardsinfo()])
  .then(([userInfo, cards]) => {
    setProfileInfo(userInfo)
    userID = userInfo._id
    setCards(cards, userID)
  })
  .catch(err => console.log(err))
enableValidation()