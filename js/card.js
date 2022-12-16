const popupOpenImage = document.querySelector('.popup-image');
const bigImage = popupOpenImage.querySelector('.popup__image');
const bigImageCaption = popupOpenImage.querySelector('.popup__caption');

export class Card {
  constructor(dataElement, templateSelector, openPopup) {
    this._name = dataElement.name;
    this._image = dataElement.link;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
  }
  _getElement() {
    const cardElement = document
      .querySelector(this._templateSelector).content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._elementLike = this._element.querySelector('.element__like');
    this._elementDelete = this._element.querySelector('.element__trash');

    this._element.querySelector('.element__image').addEventListener('click', (evt) => {
      bigImage.src = evt.target.src;
      bigImage.alt = evt.target.alt;
      bigImageCaption.textContent = evt.target.alt;
      this._openPopup(popupOpenImage)
    });

    this._elementLike.addEventListener('click', () => this.likeCard(this._elementLike));

    this._elementDelete.addEventListener('click', () => this.deleteCard(this._elementDelete));
  }

  likeCard(elementLike) {
    elementLike.classList.toggle('element__like_active');
  }

  deleteCard(elementDelete) {
    elementDelete.closest('.element').remove();
  }

  generateElement() {
    this._element = this._getElement();
    this._elementImage = this._element.querySelector('.element__image');
    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImage.src = this._image;
    this._elementImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
} 