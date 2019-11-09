import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default padding */
  ul[class],
  ol[class] {
    padding: 0;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul[class],
  ol[class],
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }

  /* Remove list styles on ul, ol elements with a class attribute */
  ul[class],
  ol[class] {
    list-style: none;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Make images easier to work with */
  img {
    max-width: 100%;
    display: block;
  }

  /* Natural flow and rhythm in articles by default */
  article > * + * {
    margin-top: 1em;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: #f4f4f4;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }

 .root {
    display: flex;
    flex-direction: column;
    height: 100vh
  }

  .header{
      width: 100%;
      position: fixed;
      box-shadow: 0px 10px 10px rgba(0,0,0,.09);
      z-index: 1;

  }

 .header-title {
      padding: 20px 0;
      background: #e84a5f;
      text-align: center;
      font-size: 2em;
      font-weight: 700;
      color: #fff;
  }



  .header.md {
    display: flex;
    width: 100%;
    align-items: center;
    background: #e84a5f;

  }

   .header.md .header-title {
      width: 100%;
  }

   .header.md .header-back {
      display: flex;
      cursor: pointer;
      font-size: 2em;
      color: white;
      margin-left: 15px;
  }


 .search {
      padding: 10px 15px;
      background: #fff;
      width: 100%
  }

  .search > form {
      display: flex;
  }

  .search > form > small {
      position: relative;
      display: flex;
      align-content: center;
      align-items: center;
      padding: 0px 20px;
      color: #e84a5f;
  }

 .search>form>input {
      width: 100%;
      border-radius: 10px;
      border: 1px solid #d3d3d3;
      padding: 10px
  }

 .search>form>input:focus {
      border: 1px solid #e84a5f
  }

 .content {
      display: flex;
      flex-direction: column;
      padding: 20px;
      background: #f4f4f4;
      height: 100%;
      padding-top: 160px;
  }

 .filtro {
      display: flex;
      align-self: flex-end;
      margin: 0 0 10px;
      color: #a9a29d;
      align-items: center;
  }

  .filtro > div {
    min-width: 170px;
    margin-left: 10px;
    cursor:pointer;

  }

 .roundButton {
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: block;
      cursor: pointer
  }
  .submenu {
    position: fixed;
    bottom: 120px;
    right: 25px;
    display: block;
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }

  .submenu > button {
      margin: 5px;
      border-radius: 50%;
      padding: 10px;
      color: #fff;
      height: 70px;
      width: 70px;
      border: 0;
      cursor: pointer;
  }

  .card {
      border-radius: 10px;
      background: #fff;
      overflow: hidden;
      display: flex;
      box-shadow: 0 4px 4px rgba(0,0,0,.05);
      margin-bottom:10px;
      min-height: 80px;

  }

  .card > .card-content {
    overflow: hidden;
  }

  .card-content > * {
    margin: 2px 0px;

  }

.card-erase {
      display: flex;
      margin: 10px;
      cursor: pointer
  }

.card-content {
      display: flex;
      flex: auto;
      flex-direction: column;
      padding: 15px
  }

 .roundButton>button {
    border-radius: 50%;
    background: #e84a5f;
    padding: 20px;
    font-size: 2.3em;
    color: #fff;
    border: 0;
    display: flex;
  }

.modal {
    display: flex;
    flex-direction: column;
    height: 100vh;
    z-index: 2;
    position: fixed;
    width: 100%;
  }

  .modal > .footer > button {
      width: 100%;
      padding: 20px 0;
      text-align: center;
      font-size: 1.2em;
      color: #fff;
      border: none;
      cursor: pointer;
      text-align: center;
  }

  .modal > .content {
    padding-top: 85px;
    overflow-y: scroll;
  }

  .modal > .content > form {
      display: flex;
      flex-direction: column;
  }

  .modal > .content > form > div {
      display: flex;
      flex-direction: column;
  }

  .modal  label{
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 42px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
  }

  .modal textarea{
    border: 1px solid;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .modal input{
  border: 1px solid;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px;
  }
`;
