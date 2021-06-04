/* eslint-disable no-console */
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
            <p>¿Tienes una cuenta? </p>
            <a id="logIn" href="#/home"> Iniciar sesión</a>
          </article>

  </section>

      `;

  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'register');
  divElement.innerHTML = viewRegister;

  const signUp = divElement.querySelector('#arrowImgRegister');
  const signUpDesk = divElement.querySelector('#signUp');
  const nameRegister = divElement.querySelector('#nameRegister');
  const mailRegister = divElement.querySelector('#mailRegister');
  const passwordRegister = divElement.querySelector('#passwordRegister');
  const errorNameUser = divElement.querySelector('#errorNameUser');
  const errorMailUser = divElement.querySelector('#errorMailUser');
  const errorPasswordUser = divElement.querySelector('#errorPasswordUser');
  // const buttonRegisterGoogleDesktop = divElement.querySelector('#buttonRegisterGoogleDesktop');
  const buttonRegisterGoogle = divElement.querySelector('#buttonRegisterGoogle');
  const validateLetters = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

  nameRegister.addEventListener('keyup', () => {
    if (!validateLetters.test(nameRegister.value)) {
      errorNameUser.innerHTML = 'Incluye solo letras, no números.';
    } else {
      errorNameUser.innerHTML = ' ';
    }
  });

  mailRegister.addEventListener('keyup', () => {
    if (!mailRegister.value.includes('@', 0)) {
      errorMailUser.innerHTML = 'Incluye un signo "@" en la dirección de correo electrónico.';
    } else {
      errorMailUser.innerHTML = ' ';
    }
  });

  passwordRegister.addEventListener('keyup', () => {
    if (passwordRegister.value.length < 6) {
      errorPasswordUser.innerHTML = 'La contraseña debe tener mínimo 6 caracteres.';
    } else {
      errorPasswordUser.innerHTML = ' ';
    }
  });

  const registerUser = () => {
    const name = document.getElementById('nameRegister').value;
    const pass = document.getElementById('passwordRegister').value;
    const email = document.getElementById('mailRegister').value;
    createUser(email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        user.updateProfile({
          displayName: name,
        });
        verificationMail()
          .then(() => {
            alert(`${name} tu usuario ha sido creado, verifica tu correo`);
          });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          alert('El mail ya ha sido registrado. Por favor, intenta con otro');
        } else {
          alert('Un error ha ocurrido. Por favor, intenta una vez más');
        }
      });
  };

  // buttonRegisterGoogleDesktop.addEventListener('click', () => {
  //   signInWithGoogle();
  // });
  buttonRegisterGoogle.addEventListener('click', () => {
    signInWithGoogle();
  });

  signUp.addEventListener('click', (registerUser));
  signUpDesk.addEventListener('click', (registerUser));
  return divElement;
};
