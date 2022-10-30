const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const closeFormButton = document.querySelector('.popup__close');
const nameInput = formElement.querySelector('.popup__input_value_name');
const jobInput = formElement.querySelector('.popup__input_value_profession');

const profileName = document.querySelector('.profile__name');
const profileProffesion = document.querySelector('.profile__profession');
const editProfileButton = document.querySelector('.profile__edit-button');

const likeButtons = document.querySelectorAll('.element__like')

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileProffesion.textContent = jobInput.value;
  profileEditFormClose();
}

function profileEditFormOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileProffesion.textContent;
}

function profileEditFormClose() {
  popup.classList.remove('popup_opened');
}

for (let i = 0; i < likeButtons.length; i += 1) {
  likeButtons[i].addEventListener('click', () => likeButtons[i].classList.toggle('element__like_active'));
}

editProfileButton.addEventListener('click', profileEditFormOpen);
closeFormButton.addEventListener('click', profileEditFormClose);
formElement.addEventListener('submit', formSubmitHandler);