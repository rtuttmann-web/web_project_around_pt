import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal, handleOverlayClose } from "./utils.js";

// --------------------------------------------
// CONFIGURAÇÃO DA VALIDAÇÃO
// --------------------------------------------
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  errorClass: "popup__input-error_active",
  inputErrorClass: "popup__input_type_error",
};

// --------------------------------------------
// DADOS INICIAIS
// --------------------------------------------
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// --------------------------------------------
// ELEMENTOS DO DOM (nível superior, fora de funções)
// --------------------------------------------

// Cartões
const cardsList = document.querySelector(".cards__list");
const cardTemplateSelector = "#card-template";

// Pop-up "Editar perfil"
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector("#edit-popup");
const profileEditForm = document.querySelector("#edit-profile-form");
const profileNameInput = profileEditForm.querySelector(
  ".popup__input_type_name"
);
const profileJobInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Pop-up "Novo local"
const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardForm = document.querySelector("#new-card-form");
const cardNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

// Pop-up de imagem ampliada
const imagePopup = document.querySelector("#image-popup");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// Todos os botões de fechar (comuns a todos os pop-ups)
const closeButtons = document.querySelectorAll(".popup__close");

// --------------------------------------------
// INSTÂNCIAS DE FORMVALIDATOR
// --------------------------------------------

const profileEditValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
profileEditValidator.setEventListeners();

const newCardValidator = new FormValidator(validationConfig, newCardForm);
newCardValidator.setEventListeners();

// --------------------------------------------
// CARTÕES
// --------------------------------------------

function handleCardImageClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

function renderCard(data, container) {
  const card = new Card(data, cardTemplateSelector, handleCardImageClick);
  const cardElement = card.generateCard();
  container.prepend(cardElement);
}

// --------------------------------------------
// FORMULÁRIO "EDITAR PERFIL"
// --------------------------------------------

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;

  closeModal(profileEditPopup);
}

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  profileEditValidator.resetValidation();
  openModal(profileEditPopup);
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// --------------------------------------------
// FORMULÁRIO "NOVO LOCAL"
// --------------------------------------------

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  renderCard({ name, link }, cardsList);

  closeModal(newCardPopup);
  newCardForm.reset();
}

newCardButton.addEventListener("click", () => {
  newCardForm.reset();
  newCardValidator.resetValidation();
  openModal(newCardPopup);
});

newCardForm.addEventListener("submit", handleCardFormSubmit);

// --------------------------------------------
// LISTENERS COMUNS (fechar pop-ups)
// --------------------------------------------

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closeModal(popup);
  });
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", handleOverlayClose);
});

// --------------------------------------------
// RENDERIZAÇÃO INICIAL
// --------------------------------------------

initialCards.forEach((item) => {
  renderCard(item, cardsList);
});