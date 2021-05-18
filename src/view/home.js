/* eslint-disable no-console */

import { logIn } from '../firebase/firebaseFx.js';

export default () => {
  const viewHome = `
    <section class="leftWrapper">
      <section id="prideImage">
        <img id="lgtbiqImage" src="./images/lgtbiq.png">
      </section>
      <header>
      <article id="logoContainer">
        <img class="logo" src="./images/colorwheel.png"><h1> PRIDE </h1>
      </article>
    </header>
      <p id="homePhrase">La red social LGTBIQ+ más grande de Latinoamérica.</p>
    </section>

    <section id="form">
    <article class="formContainer">
     <article class = "forDesktop">
      <a id="welcomeMessage"> ¡Bienvenidx!</a>
      <a id="loginMessage"> Ingresa a tu cuenta</a>
     </article>
      <a class="text">Email</a>
      <input type="email" placeholder="john.snow@gmail.com" id="email"> 
      <a class="text">Contraseña</a>
      <input type="password" placeholder="********" id="password"> 
      <article class="smallContainer">
        <article class="rememberMe"><input type="checkbox"><label class="smallText">Recuérdame</label></article>
        <a class = "smallText">Olvidé mi contraseña</a>
      </article>
      <section class="login">
          <a>Ingresar</a>
          <img id="arrowImg" src="./images/arrow.png">
      </section>
      <button class = "googleButton">
        <img src="./images/googleIcon.png" class="googleLogo">Ingresar con Google
      </button>
      <article class="smallContainer">
        <p>¿No tienes una cuenta?</p>
        <a href="#/register">Regístrate</a>
      </article>
    </article>
      <article id="prueba">
      </article>
    </section>

    `;
  const sectionElement = document.createElement('section');
  sectionElement.setAttribute('class', 'home');
  sectionElement.innerHTML = viewHome;

  const toLogIn = sectionElement.querySelector('.login');

  toLogIn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    // console.log(`email=${email} pass= ${pass}`);
    logIn(email, pass)
      .then((obj) => {
        if (obj.user.emailVerified) {
          window.location.hash = '#/feed';
        } else { alert('verifica tu correo'); }
      })
      .catch((error) => console.log(error));
  });

  return sectionElement;
};
