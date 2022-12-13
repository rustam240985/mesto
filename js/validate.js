

export class FormValidator {
  constructor(config, formItem) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formItem = formItem;
  }

  _showError = (inputElement, errorMessage) => {
    const formError = this._formItem.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._errorClass);
  };

  _hideError = (inputElement) => {
    const formError = this._formItem.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some(input => !input.validity.valid)
  }

  // Переключение состояния кнопки

  _toggleButtonState = (inputList, buttonSave) => {
    if (this._hasInvalidInput(inputList)) {
      buttonSave.classList.add(this._inactiveButtonClass);
      buttonSave.setAttribute("disabled", "disabled")
    }
    else {
      buttonSave.classList.remove(this._inactiveButtonClass);
      buttonSave.removeAttribute("disabled");
    }
  }

  // Обработчики

  _setEventListeners = () => {
    const inputList = Array.from(this._formItem.querySelectorAll(this._inputSelector));
    const buttonSave = this._formItem.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonSave);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', (evt) => {
        this._toggleButtonState(inputList, buttonSave);
        this._checkInputValidity(inputElement);
      })
    })
  }

  // Обнуление валидации

  _clearValidation = () => {
    const inputList = Array.from(this._formItem.querySelectorAll(this._inputSelector));
    const buttonSave = this._formItem.querySelector(this._submitButtonSelector);
    inputList.forEach(inputEl => {
      if (inputEl.classList.contains(this._inputErrorClass)) {
        this._hideError(inputEl);
      }
    })
    this._toggleButtonState(inputList, buttonSave);
  }

  // Включение валидации

  enableValidation = () => {
    this._clearValidation();
    this._setEventListeners();
  };

}