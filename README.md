# Around The U.S.

## Descrição

Aplicação web interativa que apresenta uma galeria de lugares ao redor do mundo através de cartões dinâmicos. O projeto permite ao usuário visualizar, curtir, excluir e adicionar novos locais, além de ampliar as imagens em um pop-up.

## Funcionalidades

- Exibição dinâmica dos cartões iniciais a partir de um array de dados e um elemento `<template>`
- Edição do perfil do usuário (nome e descrição) através de um pop-up
- Criação de novos cartões através do pop-up "Novo Local", com título e link de imagem personalizados
- Botão de curtir em cada cartão, que altera a aparência ao ser clicado
- Botão de excluir em cada cartão, que o remove do DOM
- Ampliação da imagem do cartão em um pop-up ao clicar nela
- Fechamento dos pop-ups através do botão de fechar, da tecla `Esc` ou do clique fora da área do pop-up
- Validação em tempo real dos formulários, com o botão de envio desabilitado enquanto houver campos inválidos

## Tecnologias e técnicas utilizadas

- HTML5 semântico
- CSS3 (metodologia BEM, Flexbox)
- JavaScript (manipulação do DOM, `<template>`, eventos, `ValidityState`)
- Programação Orientada a Objetos (classes ES6: `Card`, `FormValidator`, `Section`, `Popup`, `PopupWithImage`, `PopupWithForms`, `UserInfo`; herança e encapsulamento com propriedades e métodos privados)
- Módulos JS (`import`/`export`), com o código dividido em arquivos separados por classe
- Git e GitHub para controle de versão

## Estrutura do projeto

```
├── index.html
├── page/
│   ├── index.css
│   └── index.js
├── components/
│   ├── Card.js
│   ├── FormValidator.js
│   ├── Section.js
│   ├── Popup.js
│   ├── PopupWithImage.js
│   ├── PopupWithForms.js
│   └── UserInfo.js
├── utils/
│   └── constants.js
├── blocks/
├── images/
└── vendor/
```

## GitHub Pages

👉 [Ver o projeto online](https://rtuttmann-web.github.io/web_project_around_pt/)