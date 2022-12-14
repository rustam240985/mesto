import { openPopup } from "./index.js";

const popupOpenImage = document.querySelector('.popup-image');
const bigImage = popupOpenImage.querySelector('.popup__image');
const bigImageCaption = popupOpenImage.querySelector('.popup__caption');
const elementTemplate = document.querySelector('#element-template').content;

export class Card {
  constructor(dataElement, templateSelector) {
    this._name = dataElement.name;
    this._image = dataElement.link;
    this._templateSelector = templateSelector;
  }
  _getElement() {
    const cardElement = elementTemplate
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
    });

    this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
      evt.target.closest('.element').remove();
    });

    this._element.querySelector('.element__image').addEventListener('click', (evt) => {
      bigImage.src = evt.target.src;
      bigImage.alt = evt.target.alt;
      bigImageCaption.textContent = evt.target.alt;
      openPopup(popupOpenImage)
    });
  }

  generateElement() {
    this._element = this._getElement();
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._name;


    this._setEventListeners();

    return this._element;
  }
}