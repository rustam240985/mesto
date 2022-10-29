// Находим форму в DOM
let formElement = document.querySelector('.pupup__edit-form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input[name="profile-name"]');
let jobInput = formElement.querySelector('.popup__input[name="profile-profession"]');

let editProfileButton = document.querySelector('.profile__edit-button');
let closeFormButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

let textProfileName = document.querySelector('.profile__name');
let textProfileProffesion = document.querySelector('.profile__profession');
console.log(nameInput);

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  

  let profileName = nameInput.value;
  let profileProfession = jobInput.value;

  textProfileName.textContent = profileName;
  textProfileProffesion.textContent = profileProfession;
  popup.classList.remove('popup_opened');
}

function profileEditFormOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = textProfileName.textContent;
  jobInput.value = textProfileProffesion.textContent;
}

function profileEditFormClose() {
  popup.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', profileEditFormOpen);
closeFormButton.addEventListener('click', profileEditFormClose);
formElement.addEventListener('submit', formSubmitHandler);