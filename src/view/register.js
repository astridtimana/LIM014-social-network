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

        <section>
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

      </section> 


      `;

  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'register');
  divElement.innerHTML = viewRegister;

  const signUp = divElement.querySelector('#arrowImgRegister');
  const signUpDesk = divElement.querySelector('#signUp');
  const nameInput = divElement.querySelector('#name');
  const mailInput = divElement.querySelector('#mailInput');
  const passwordInput = divElement.querySelector('#passwordInput');
  const errorNameUser = divElement.querySelector('#errorNameUser');
  const errorMailUser = divElement.querySelector('#errorMailUser');
  const errorPasswordUser = divElement.querySelector('#errorPasswordUser');

  nameInput.addEventListener('keyup', () => {
    if (!nameInput.value.includes('@', 0)) {
      errorEmailMessage.innerHTML = 'Incluye un signo "@" en la dirección de correo electrónico.';
    } else if (emailInput.value.includes('@', 0)) {
      errorEmailMessage.innerHTML = ' ';
    }
  });

  const registerUser = () => {
    const name = document.getElementById('name').value;
    const pass = document.getElementById('passwordRegister').value;
    const email = document.getElementById('emailRegister').value;

    createUser(email, pass)
      .then(() => {
        verificationMail();
        alert(`${name} tu usuario ha sido creado, verifica tu correo`);
      })
      .catch((error) => { console.log(error); }); 
  };
  signUp.addEventListener('click', (registerUser));
  signUpDesk.addEventListener('click', (registerUser));

  return divElement;
};
