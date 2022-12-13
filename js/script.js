import { Card } from "./card.js";
import { FormValidator } from "./validate.js";

const popups = document.querySelectorAll('.popup')
const popupEditProfile = document.querySelector('.popup-profile');
const popupAddCard = document.querySelector('.popup-add-card');
const formElement = document.querySelector('.edit-profile-form');
const formCard = document.querySelector('.add-card-form');
const nameInput = formElement.querySelector('.popup__input_value_name');
const jobInput = formElement.querySelector('.popup__input_value_profession');
const nameCard = formCard.querySelector('.popup__input_value_place');
const sourceImageCard = formCard.querySelector('.popup__input_value_url');
const elementsSection = document.querySelector('.elements');

const profileName = document.querySelector('.profile__name');
const profileProffesion = document.querySelector('.profile__profession');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

//Массив с карточками(заголовок, путь)

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const configValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

function renderElement(dataElement) {
  elementsSection.prepend(new Card(dataElement, '#element-template').generateElement());
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

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', setEventListenerEsc);
}

//Закрытие попапа

export function closePopup(popup) {
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

const formElementValidator = new FormValidator(configValidate, formElement);
const formCardValidator = new FormValidator(configValidate, formCard);

// Обработчики событий (кнопка редактирования профиля, кнопка добавления карточки, формы)

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProffesion.textContent;
  formElementValidator.enableValidation();
  openPopup(popupEditProfile);
});
addCardButton.addEventListener('click', () => {
  nameCard.value = '';
  sourceImageCard.value = '';
  formCardValidator.enableValidation();
  openPopup(popupAddCard);
});
formElement.addEventListener('submit', handleProfileFormSubmit);
formCard.addEventListener('submit', handleCardFormSubmit);






