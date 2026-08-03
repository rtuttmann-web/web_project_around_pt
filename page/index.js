import Section from '../components/Section.js';
import { Card } from '../components/Card.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForms from '../components/PopupWithForms.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../utils/constants.js';

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

// --- Validação dos formulários ---
const formValidators = {};

const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formElement) => {
  const validator = new FormValidator(validationConfig, formElement);
  const formName = formElement.getAttribute('id');
  formValidators[formName] = validator;
  validator.setEventListeners();
});

// --- Pop-up de imagem ---
const popupWithImage = new PopupWithImage('#image-popup');
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open({ name, link });
}

// --- Cards ---
function createCard(item) {
  const card = new Card(item, '#card-template', handleCardClick);
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  },
  '.cards__list'
);
cardSection.renderItems();

// --- Informações do usuário ---
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__description',
});

// --- Pop-up de editar perfil ---
const editPopup = new PopupWithForms('#edit-popup', (formData) => {
  userInfo.setUserInfo({ name: formData.name, job: formData.description });
  editPopup.close();
});
editPopup.setEventListeners();

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => {
  const currentInfo = userInfo.getUserInfo();
  editPopup.setInputValues({ name: currentInfo.name, description: currentInfo.job });
  formValidators['edit-profile-form'].resetValidation();
  editPopup.open();
});

// --- Pop-up de novo cartão ---
const addPopup = new PopupWithForms('#new-card-popup', (formData) => {
  const newCard = { name: formData['place-name'], link: formData.link };
  cardSection.addItem(createCard(newCard));
  addPopup.close();
});
addPopup.setEventListeners();

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => {
  formValidators['new-card-form'].resetValidation();
  addPopup.open();
});