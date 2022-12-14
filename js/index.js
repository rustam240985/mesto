import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./constants.js";

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup-profile');
const popupAddCard = document.querySelector('.popup-add-card');
const formEditProfile = document.querySelector('.edit-profile-form');
const formCard = document.querySelector('.add-card-form');
const nameInput = formEditProfile.querySelector('.popup__input_value_name');
const jobInput = formEditProfile.querySelector('.popup__input_value_profession');
const nameCard = formCard.querySelector('.popup__input_value_place');
const sourceImageCard = formCard.querySelector('.popup__input_value_url');
const elementsSection = document.querySelector('.elements');

const profileName = document.querySelector('.profile__name');
const profileProffesion = document.querySelector('.profile__profession');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// Конфиг валидации

const configValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const formEditProfileValidator = new FormValidator(configValidate, formEditProfile);
const formCardValidator = new FormValidator(configValidate, formCard);

formEditProfileValidator.enableValidation();
formCardValidator.enableValidation();

function renderElement(dataElement) {
  const card = new Card(dataElement, '#element-template', openPopup);
  elementsSection.prepend(card.generateElement());
}

initialCards.forEach(dataElement => {
  renderElement(dataElement);
})

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderElement({ name: nameCard.value, link: sourceImageCard.value });
  closePopup(popupAddCard);
}

//Редактирование профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProffesion.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

//Открытие попапа

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', setEventListenerEsc);
}

//Закрытие попапа

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', setEventListenerEsc);
}

//Обработчики закрытия попапов

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

const setEventListenerEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    evt.preventDefault();
    closePopup(popupOpened);
  }
}

// Обработчики событий (кнопка редактирования профиля, кнопка добавления карточки, формы)

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProffesion.textContent;
  formEditProfileValidator.clearValidation();
  openPopup(popupEditProfile);
});
addCardButton.addEventListener('click', () => {
  nameCard.value = '';
  sourceImageCard.value = '';
  formCardValidator.clearValidation();
  openPopup(popupAddCard);
});
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formCard.addEventListener('submit', handleCardFormSubmit);






