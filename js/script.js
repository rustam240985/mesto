const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_value_name');
const jobInput = formElement.querySelector('.popup__input_value_profession');
const elementsSection = document.querySelector('.elements');

const profileName = document.querySelector('.profile__name');
const profileProffesion = document.querySelector('.profile__profession');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

/* const cardImages = document.querySelectorAll('.element__image');
const cardTitles = document.querySelectorAll('.element__title'); */

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

/* for (let i = 0; i < cardImages.length; i += 1) {
  cardImages[i].src = initialCards[i].link;
  cardTitles[i].textContent = initialCards[i].name;
} */



/* cardImage.src = `${initialCards[0].link}` */

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
  elementsSection.append(generateElement(dataElement));
}

initialCards.forEach((dataElement) => {
  renderElement(dataElement);
})

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileProffesion.textContent = jobInput.value;
  popupClose();
}

function popupOpen() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProffesion.textContent;
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}


editProfileButton.addEventListener('click', popupOpen);
closePopupButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);
addCardButton.addEventListener('click', () => {

})