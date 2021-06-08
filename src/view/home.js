/* eslint-disable no-console */

import { logIn, signInWithGoogle, resetPasswordMail } from '../firebase/firebaseFx.js';

export default () => {
  const viewHome = `
      <section class="leftWrapper">
      <section id="prideImage">
        <img id="lgtbiqImage" src="./images/lgtb.png">
      </section>
      <header>
      <article id="logoContainer">
        <img class="logo" src="./images/colorwheel.png"><h1 class="letterPride"> PRIDE </h1>
      </article>
    </header>
      <p id="homePhrase">La red social LGTBIQ+ más grande de Latinoamérica.</p>
    </section>

    <section id="form">
    <article class="formContainerHome">
     <article class = "forDesktopHome">
      <a id="welcomeMessage"> ¡Bienvenidx!</a><br><br>
      <a id="loginMessage"> Ingresa a tu cuenta</a>
     </article>
      <a class="textHome" >Email</a>
      <input type="email" placeholder="john.snow@gmail.com" id="email"> 
      <p class = "errorMailMessage"></p>
      <a class="textHome" >Contraseña</a>
      <input type="password" placeholder="********" id="password"> 
      <article class="smallContainer">
        <article class="rememberMe"><input type="checkbox"><label class="smallText">Recuérdame</label></article>
        <a class = "smallText" id="forgotPassword">Olvidé mi contraseña</a>
      </article>
          <section class="login">
              <a id="enterHome">Ingresar</a>
              <img id="arrowImg" src="./images/arrow.png">
          </section>
          <button class = "googleButton" id="goggleButton">
            <img src="./images/googleIcon.png" class="googleLogo"> Ingresar con Google
          </button>
          <article class="smallContainer">
            <p>¿No tienes una cuenta?</p>
            <a href="#/register">Regístrate</a>
          </article>
      </article>
      <p id="userIncorrect"> </p>
    </section>
    `;
  const sectionElement = document.createElement('section');
  sectionElement.setAttribute('class', 'home');
  sectionElement.innerHTML = viewHome;

  const toLogIn = sectionElement.querySelector('.login');
  const emailInput = sectionElement.querySelector('#email');
  const errorEmailMessage = sectionElement.querySelector('.errorMailMessage');
  const googleButton = sectionElement.querySelector('.googleButton');
  const forgotPassword = sectionElement.querySelector('#forgotPassword');

  emailInput.addEventListener('keyup', () => {
    if (!emailInput.value.includes('@', 0)) {
      errorEmailMessage.innerHTML = 'Incluye un signo "@" en la dirección de correo electrónico.';
    } else if (emailInput.value.includes('@', 0)) {
      errorEmailMessage.innerHTML = ' ';
    }
  });

  googleButton.addEventListener('click', () => {
    signInWithGoogle();
  });

  const userIncorrect = sectionElement.querySelector('#userIncorrect');
  forgotPassword.addEventListener('click', () => {
    resetPasswordMail(emailInput.value)
      .then(() => {
        userIncorrect.textContent = '🦄Te hemos enviado un correo de recuperación de contraseña.🦄';
      })
      .catch(() => {
        userIncorrect.textContent = '💜💙💛Escribe el correo o verifica que esté bien escrito.💛💙💜';
      });
  });

  toLogIn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    logIn(email, pass)
      .then((obj) => {
      /* const user = obj.user; */
        if (obj.user.emailVerified) {
          window.location.hash = '#/feed';
        } else { userIncorrect.textContent = '💜💛💙Verifica tu correo.💙💛💜'; }
      })
      .catch(() => {
        userIncorrect.textContent = '🦄Dirección de correo electrónico o contraseña incorrectos.🦄';
      });
  });

  return sectionElement;
};
