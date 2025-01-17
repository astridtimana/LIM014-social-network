/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-unreachable */
// será necesario hacer una página de js para el modal???.

import { createUser, verificationMail, signInWithGoogle } from '../firebase/firebaseFx.js';

export default () => {
  const viewRegister = `
  <section id="register">
        <header id="headerCreate">
          <img id="logoBig" src="./images/colorwheel2.png">
          <h2 id="createAccount"> Crear cuenta </h2>
        </header>

      <section id="formRegister">

          <article class="toDesktop">
            <header id="headerCreateToDesktop">
              <article id="logoContainer">
                <img class="logo" src="./images/colorwheel.png"><h2> PRIDE </h2>
              </article>
            </header>
            
            <p id="textRegister">Regístrate para ver fotos y videos de tus amigos.</p>
            
            <input type="name" placeholder="Nombre y apellido" id="nameRegister" class="inputRegister">
            <p id = "errorNameUser" class="errorRegister" ></p>
            <input type="email" placeholder="Correo electrónico" id="mailRegister" class="inputRegister">
            <p id = "errorMailUser" class="errorRegister" ></p> 
            <input type="password" placeholder="Contraseña" id="passwordRegister" class="inputRegister"> 
            <p id = "errorPasswordUser" class="errorRegister"></p> 
            <button id="signUp"> Regístrate</button>
            <p id="textConditions">Al registrarte, aceptas nuestras Condiciones, Política de datos, Política de cookies.</p>
      </section>
          
          <section id="buttonRegister">
            <a>Registrar</a>
            <img id="arrowImgRegister" src="./images/arrow.png">
          </section>

          <button class="googleButton" id="buttonRegisterGoogle">
            <img src="./images/googleIcon.png" class="googleLogoRegister">Regístrate con Google
          </button>

          <article class="containerRegister">
            <p>¿Tienes una cuenta?</p>
            <a id="logIn" href="#/home"> Iniciar sesión</a>
          </article>

          <input type="name" placeholder="Nombre y apellido" id="name">
          <input type="email" placeholder="Correo electrónico" id="emailRegister">
          <input type="password" placeholder="Contraseña" id="passwordRegister">
          <button id="signUp"> Regístrate</button>
          <p id="textConditions">Al registrarte, aceptas nuestras <a href="">Condiciones</a>, la <a href="">Política de
                  datos</a> y la <a href="">Política de cookies</a>.</p>
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

      `;

  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'register');
  divElement.innerHTML = viewRegister;

  const logIn = divElement.querySelector('#arrowImgRegister');
  const loginDesk = divElement.querySelector('#signUp');

  const registerUser = () => {
    const email = document.getElementById('emailRegister').value;
    const pass = document.getElementById('passwordRegister').value;
    const name = document.getElementById('name').value;
    createUser(email, pass, name);
  };
  logIn.addEventListener('click', (registerUser));
  loginDesk.addEventListener('click', (registerUser));
  return divElement;
};
