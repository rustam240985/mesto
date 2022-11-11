const popupEditProfile = document.querySelector('.popup_action_edit-profile');
const popupAddCard = document.querySelector('.popup_action_insert-card');
const closePopupEditProfile = popupEditProfile.querySelector('.popup__close');
const closePopupAddCard = popupAddCard.querySelector('.popup__close');
const formElement = document.querySelector('.edit-profile-form');
const formCard = document.querySelector('.add-card-form');
const nameInput = formElement.querySelector('.popup__input_value_name');
const jobInput = formElement.querySelector('.popup__input_value_profession');
const nameCard = formCard.querySelector('.popup__input_value_place');
const imageCard = formCard.querySelector('.popup__input_value_url');
const elementsSection = document.querySelector('.elements');

const profileName = document.querySelector('.profile__name');
const profileProffesion = document.querySelector('.profile__profession');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const elementTemplate = document.querySelector('#element-template').content;

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

function generateElement(dataElement) {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  const title = newElement.querySelector('.element__title');
  const image = newElement.querySelector('.element__image');
  const likeButton = newElement.querySelector('.element__like')
  title.textContent = dataElement.name;
  image.src = dataElement.link;
  image.alt = dataElement.name;

  likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like_active'));

  return newElement;
}

function renderElement(dataElement) {
  elementsSection.prepend(generateElement(dataElement));
}

initialCards.forEach((dataElement) => {
  renderElement(dataElement);
})

function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProffesion.textContent = jobInput.value;
  popupClose();
}

function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  renderElement({ name: nameCard.value, link: imageCard.value });
  popupClose();
}

function popupOpen(event) {
  if (event.target.classList.contains('profile__edit-button')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileProffesion.textContent;
    popupEditProfile.classList.add('popup_opened');
  }
  else if (event.target.classList.contains('profile__add-button')) {
    nameCard.value = '';
    imageCard.value = '';
    popupAddCard.classList.add('popup_opened')
  }
}

function popupClose(event) {
  document.querySelectorAll('.popup').forEach(popup => popup.classList.remove('popup_opened'))
}

editProfileButton.addEventListener('click', popupOpen);
closePopupAddCard.addEventListener('click', popupClose);
closePopupEditProfile.addEventListener('click', popupClose);
formElement.addEventListener('submit', formEditProfileSubmitHandler);
formCard.addEventListener('submit', formAddCardSubmitHandler)
addCardButton.addEventListener('click', popupOpen)