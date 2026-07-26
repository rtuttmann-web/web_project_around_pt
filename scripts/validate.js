// ============================================
// VALIDAÇÃO DE FORMULÁRIOS
// ============================================

// --------------------------------------------
// CONFIGURAÇÃO
// --------------------------------------------
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  errorClass: "popup__input-error_active",
  inputErrorClass: "popup__input_type_error",
};

// --------------------------------------------
// EXIBIÇÃO DE ERROS
// --------------------------------------------

function showInputError(inputElement, errorMessage, config) {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(inputElement, config) {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

// --------------------------------------------
// VALIDAÇÃO UNIVERSAL DE UM CAMPO
// --------------------------------------------

function checkInputValidity(inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(inputElement, config);
  }
}

// --------------------------------------------
// ESTADO DO BOTÃO DE ENVIO
// --------------------------------------------

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement) {
  buttonElement.disabled = hasInvalidInput(inputList);
}

// --------------------------------------------
// OUVINTES DE EVENTO
// --------------------------------------------

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement, config);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// --------------------------------------------
// ATIVAÇÃO GERAL DA VALIDAÇÃO
// --------------------------------------------

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

// --------------------------------------------
// REDEFINIR VALIDAÇÃO (usado ao reabrir um pop-up)
// --------------------------------------------

function clearValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(inputElement, config);
  });

  toggleButtonState(inputList, buttonElement);
}

enableValidation(validationConfig);