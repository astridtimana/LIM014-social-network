/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-unreachable */
// será necesario hacer una página de js para el modal???.

import { createUser } from '../firebase/firebaseFx.js';

export default () => {
  const viewRegister = `
  <section id="registerMobile">
  <header id="headerCreate">
    <img id="logoBig" src="./images/colorwheel2.png">
    <h2 id="createAccount"> Crear cuenta </h2>
  </header>
  <section>
    <section id="formRegister">
      <input type="name" placeholder="Nombre" id="name">
      <input type="email" placeholder="Correo" id="emailRegister"> 
      <input type="password" placeholder="Contraseña" id="passwordRegister"> 
    </section>
    <section id="buttonRegister">
      <a>Registrar</a>
      <img id="arrowImgRegister" src="./images/arrow.png">
    </section>
    
    <button class="googleButton" id="buttonRegisterGoogle">
      <img src="./images/googleIcon.png" class="googleLogo">Registrar con Google
    </button>
    <article class="containerRegister">
      <p>¿Tienes una cuenta?</p>
      <a id="logIn" href="#/registro">Iniciar sesión</a>
    </article>
  </section>
</section>  
<section id="registerDesktop">
  <header id="headerCreate">
    <article id="logoContainer">
    <img class="logo" src="./images/colorwheel.png"><h2> PRIDE </h2>
  </article>
  </header>
  
  <section id="formRegisterDesktop">
    <p id="txtRegister">Regístrate para ver fotos y videos de tus amigos.</p>
    
    <button class="googleButton" id="buttonRegisterGoogleDesktop">
      <img src="./images/googleIcon.png" class="googleLogo">Iniciar sesión con Google
    </button>
    
    <input type="email" placeholder="Correo electrónico" id="emailDesktop"> 
    <input type="email" placeholder="Nombre y apellido" id="nameDesktop">
    <input type="password" placeholder="Contraseña" id="passwordDesktop"> 
    
    <button id="createAccount"> Regístrate</button>
    
    <p id="txtConditions">Al registrarte, aceptas nuestras <a href="">Condiciones</a>, la <a href="">Política de datos</a> y la <a href="">Política de cookies</a>.</p>
    
    <article class="smallContainer">
      <p>¿Tienes una cuenta?</p>
      <a id="login" href="#/registro">Inicia sesión</a>
    </article>
      `;

  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'register');
  divElement.innerHTML = viewRegister;

  const logIn = divElement.querySelector('#arrowImgRegister');
  
  logIn.addEventListener('click', () => {
    const email = document.getElementById('emailRegister').value;
    const pass = document.getElementById('passwordRegister').value;
    const name = document.getElementById('name').value;
    // console.log(`email=${email} pass= ${pass}`);
    createUser(email, pass, name);
    // verificationMail();
  });

  return divElement;
};
