/* eslint-disable no-console */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-unreachable */
// será necesario hacer una página de js para el modal???.

import { createUser, verificationMail } from '../firebase/firebaseFx.js';

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
            
            <button class="googleButton" id="buttonRegisterGoogleDesktop">
              <img src="./images/googleIcon.png" class="googleLogo">Iniciar sesión con Google
            </button>
          </article>  
      
            <input type="name" placeholder="Nombre y apellido" id="nameInput">
            <p id = "errorNameUser"></p>
            <input type="email" placeholder="Correo electrónico" id="mailInput">
            <p id = "errorMailUser"></p> 
            <input type="password" placeholder="Contraseña" id="passwordInput"> 
            <p id = "errorPasswordUser"></p> 
            <button id="signUp"> Regístrate</button>
            <p id="textConditions">Al registrarte, aceptas nuestras <a href="">Condiciones</a>, la <a href="">Política de datos</a> y la <a href="">Política de cookies</a>.</p>
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
            <a id="logIn" href="#/home">Iniciar sesión</a>
          </article>

  </section>

      `;

  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'register');
  divElement.innerHTML = viewRegister;

  const signUp = divElement.querySelector('#arrowImgRegister');
  const signUpDesk = divElement.querySelector('#signUp');
  const nameInput = divElement.querySelector('#nameInput');
  const mailInput = divElement.querySelector('#mailInput');
  const passwordInput = divElement.querySelector('#passwordInput');
  const errorNameUser = divElement.querySelector('#errorNameUser');
  const errorMailUser = divElement.querySelector('#errorMailUser');
  const errorPasswordUser = divElement.querySelector('#errorPasswordUser');
  const validateLetters = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

  nameInput.addEventListener('keyup', () => {
    if (!validateLetters.test(nameInput.value)) {
      errorNameUser.innerHTML = 'Incluye solo letras, no números.';
    } else {
      errorNameUser.innerHTML = ' ';
    }
  });

  mailInput.addEventListener('keyup', () => {
    if (!mailInput.value.includes('@', 0)) {
      errorMailUser.innerHTML = 'Incluye un signo "@" en la dirección de correo electrónico.';
    } else {
      errorMailUser.innerHTML = ' ';
    }
  });

  passwordInput.addEventListener('keyup', () => {
    if (passwordInput.value.length < 6) {
      errorPasswordUser.innerHTML = 'La contraseña debe tener mínimo 6 caracteres.';
    } else {
      errorPasswordUser.innerHTML = ' ';
    }
  });

  const registerUser = () => {
    const name = document.getElementById('name').value;
    const pass = document.getElementById('passwordRegister').value;
    const email = document.getElementById('emailRegister').value;
    createUser(email, pass)
      .then((user) => {
        verificationMail().then((message) => {
          console.log(message);
        });
        alert(`${name} tu usuario ha sido creado, verifica tu correo`);
      })
      .catch((error) => {
        const errorCode = error.code; //
        const errorMessage = error.message; // 'auth-invalid email'
        alert(`Error: ${errorCode}`);
        alert(`Error: ${errorMessage}`);
      }); 
  };
  signUp.addEventListener('click', (registerUser));
  signUpDesk.addEventListener('click', (registerUser));
  return divElement;
};
