// Отображения/скрытия ошибки

const showError = (config, formItem, inputElement, errorMessage) => {
  const formError = formItem.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(config.errorClass);
};

const hideError = (config, formItem, inputElement) => {
  const formError = formItem.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  formError.classList.remove(config.errorClass);
  formError.textContent = '';
};

// Валидации полей ввода

const checkInputValidity = (config, formItem, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(config, formItem, inputElement, inputElement.validationMessage);
  } else {
    hideError(config, formItem, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid)
}

// Переключение состояния кнопки

const toggleButtonState = (config, inputList, buttonSave) => {
  if (hasInvalidInput(inputList)) {
    buttonSave.classList.add(config.inactiveButtonClass);
  }
  else {
    buttonSave.classList.remove(config.inactiveButtonClass);
  }
}

// Обработчики

const setEventListeners = (formItem, config) => {
  const inputList = Array.from(formItem.querySelectorAll(config.inputSelector));
  const buttonSave = formItem.querySelector(config.submitButtonSelector);
  toggleButtonState(config, inputList, buttonSave);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(config, inputList, buttonSave);
      checkInputValidity(config, formItem, inputElement);
    })
  })
}

// Включение валидации

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formItem => {
    setEventListeners(formItem, config);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});