/* eslint-disable no-console */
<<<<<<< HEAD

import { logIn, signInWithGoogle, resetPasswordMail } from '../firebase/firebaseFx.js';

=======
>>>>>>> 69e7a0eb6c82e37f8f29868bf22d6cd3ec21f6d9
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
<<<<<<< HEAD
      <p class = "errorMailMessage"></p>
      <a class="textHome" >Contraseña</a>
=======
      <a class="text">Contraseña</a>
>>>>>>> 69e7a0eb6c82e37f8f29868bf22d6cd3ec21f6d9
      <input type="password" placeholder="********" id="password"> 
      <article class="smallContainer">
        <article class="rememberMe"><input type="checkbox"><label class="smallText">Recuérdame</label></article>
        <a class = "smallText" id="forgotPassword">Olvidé mi contraseña</a>
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
    </section>
    `;
  const sectionElement = document.createElement('section');
  sectionElement.setAttribute('class', 'home');
  sectionElement.innerHTML = viewHome;
  return sectionElement;
};
