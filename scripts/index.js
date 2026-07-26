// ============================================
// PROJETO 9 - VALIDAÇÃO DE FORMULÁRIOS
// "Around The U.S."
// ============================================

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
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

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
// FUNÇÕES DE MODAL (genéricas — usadas por todos os pop-ups)
// --------------------------------------------

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function handleOverlayClose(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

// --------------------------------------------
// CARTÕES
// --------------------------------------------

function getCardElement(data) {
  const { name, link } = data;

  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener("click", () => {
    handleLikeClick(likeButton);
  });

  deleteButton.addEventListener("click", () => {
    handleDeleteClick(cardElement);
  });

  cardImage.addEventListener("click", () => {
    handleCardImageClick(name, link);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement({ name, link });
  container.prepend(cardElement);
}

function handleLikeClick(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

function handleDeleteClick(cardElement) {
  cardElement.remove();
}

function handleCardImageClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
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
  clearValidation(profileEditForm, validationConfig);
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

  renderCard(name, link, cardsList);

  closeModal(newCardPopup);
  newCardForm.reset();
}

newCardButton.addEventListener("click", () => {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
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
  renderCard(item.name, item.link, cardsList);
});