export const cardTemplateSelector = '.place-template'
export const cardsContainerSelector = '.places'
export const container = document.querySelector(cardsContainerSelector)
export const imagePopupSelector = '.image-popup'
export const profilePopupSelector = '.profile-popup'
export const cardPopupSelector = '.card-popup'
export const confirmPopupSelector = '.confirm-popup'
export const updateAvatarPopupSelector = '.update-avatar-popup'
export const popupButton = '.popup__button'
export const closeButtons = document.querySelectorAll('.popup__close-button');
export const avatarEditButton = document.querySelector('.profile__image')
export const profileEditButton = document.querySelector('.profile__edit-button')
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileNameSelector = '.profile__name'
export const profileDescriptionSelector = '.profile__description'
export const profileImagePlace = '.profile__image'
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};