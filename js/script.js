const popupEditProfile = document.querySelector('.popup-profile');
const popupAddCard = document.querySelector('.popup-add-card');
const popupOpenImage = document.querySelector('.popup-image');
const bigImage = popupOpenImage.querySelector('.popup__image');
const bigImageCaption = popupOpenImage.querySelector('.popup__caption');
const closeButtons = document.querySelectorAll('.popup__close');
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
  image.addEventListener('click', event => {
    bigImage.src = event.target.src;
    bigImage.alt = event.target.alt;
    bigImageCaption.textContent = event.target.alt;
    openPopup(popupOpenImage)
  })
  return newElement;
}

//Добавление карточки на страницу

function renderElement(dataElement) {
  elementsSection.prepend(generateElement(dataElement));
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
}

//Закрытие попапа

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Обработчики закрытия попапов

closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//Обработчики событий (кнопка редактирования профиля, кнопка добавления карточки, формы)

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProffesion.textContent;
  openPopup(popupEditProfile);
});
addCardButton.addEventListener('click', () => {
  nameCard.value = '';
  sourceImageCard.value = '';
  openPopup(popupAddCard);
});
formElement.addEventListener('submit', handleProfileFormSubmit);
formCard.addEventListener('submit', handleCardFormSubmit);


