const popupEditProfile = document.querySelector('.popup-profile');
const popupAddCard = document.querySelector('.popup-add-card');
const popupOpenImage = document.querySelector('.popup-image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupImageCaption = popupOpenImage.querySelector('.popup__caption');
const closePopupEditProfile = popupEditProfile.querySelector('.popup__close');
const closePopupAddCard = popupAddCard.querySelector('.popup__close');
const closeImagePopup = popupOpenImage.querySelector('.popup__close');
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
const elementTemplate = document.querySelector('#element-template').content;

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

//Генерация карточки

function generateElement(dataElement) {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  const title = newElement.querySelector('.element__title');
  const image = newElement.querySelector('.element__image');
  const likeButton = newElement.querySelector('.element__like');
  const trashCardButton = newElement.querySelector('.element__trash');
  title.textContent = dataElement.name;
  image.src = dataElement.link;
  image.alt = dataElement.name;

  likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like_active'));
  trashCardButton.addEventListener('click', evt => evt.target.closest('.element').remove());
  image.addEventListener('click', popupOpen)
  return newElement;
}

//Добавление карточки на страницу

function renderElement(dataElement) {
  elementsSection.prepend(generateElement(dataElement));
}

initialCards.forEach((dataElement) => {
  renderElement(dataElement);
})

function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  renderElement({ name: nameCard.value, link: sourceImageCard.value });
  popupClose(popupAddCard);
}

//Редактирование профиля

function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProffesion.textContent = jobInput.value;
  popupClose(popupEditProfile);
}

//Открытие попапа

function popupOpen(event) {
  if (event.target.classList.contains('profile__edit-button')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileProffesion.textContent;
    popupEditProfile.classList.add('popup_opened');
  }
  else if (event.target.classList.contains('profile__add-button')) {
    nameCard.value = '';
    sourceImageCard.value = '';
    popupAddCard.classList.add('popup_opened');
  }
  else if (event.target.classList.contains('element__image')) {
    popupImage.src = `${event.target.src}`;
    popupImage.alt = `${event.target.alt}`;
    popupImageCaption.textContent = `${event.target.alt}`;
    popupOpenImage.classList.add('popup_opened');
  }
}

//Закрытие попапа

function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

//Обработчики событий (кнопка редактирования профиля, кнопка добавления карточки, кнопки закрытия попапов, формы)

editProfileButton.addEventListener('click', popupOpen);
addCardButton.addEventListener('click', popupOpen);
closePopupAddCard.addEventListener('click', () => popupClose(popupAddCard));
closePopupEditProfile.addEventListener('click', () => popupClose(popupEditProfile));
closeImagePopup.addEventListener('click', () => popupClose(popupOpenImage));
formElement.addEventListener('submit', formEditProfileSubmitHandler);
formCard.addEventListener('submit', formAddCardSubmitHandler);


