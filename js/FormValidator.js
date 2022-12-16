export class FormValidator {
  constructor(config, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    this._buttonSave = this._formSelector.querySelector(this._submitButtonSelector);
  }

  _showError = (inputElement, errorMessage) => {
    this._formError = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._formError.textContent = errorMessage;
    this._formError.classList.add(this._errorClass);
  };

  _hideError = (inputElement) => {
    const formError = this._formSelector.querySelector(`.${inputElement.id}-error`);
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

  _hasInvalidInput = () => {
    return this._inputList.some(input => !input.validity.valid)
  }

  // Переключение состояния кнопки

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonSave.classList.add(this._inactiveButtonClass);
      this._buttonSave.setAttribute("disabled", "disabled")
    }
    else {
      this._buttonSave.classList.remove(this._inactiveButtonClass);
      this._buttonSave.removeAttribute("disabled");
    }
  }

  // Обработчики

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', (evt) => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      })
    })
  }

  // Обнуление валидации

  clearValidation = () => {
    this._inputList.forEach(inputEl => {
      if (inputEl.classList.contains(this._inputErrorClass)) {
        this._hideError(inputEl);
      }
    })
    this._toggleButtonState();
  }

  // Включение валидации

  enableValidation = () => this._setEventListeners();

}