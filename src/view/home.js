/* eslint-disable no-console */
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

    <section id="formMobile">
      <input type="email" placeholder="Correo" id="correo"> 
      <input type="password" placeholder="Contraseña" id="contraseña"> 
      <article class="smallContainer">
        <article class="rememberMe"><input type="checkbox"><label class="smallText">Recuérdame</label></article>
        <a class = "smallText">Olvidé mi contraseña</a>
      </article>
      <a class= "loginMobile">Ingresar</a>
      <i class="fas fa-arrow-right"></i> 
      <button class = "googleButton">
        <img src="./images/googleIcon.png" class="googleLogo">Ingresar con Google
      </button>
      <article class="smallContainer">
        <p>¿No tienes una cuenta?</p>
        <a href="#/register">Regístrate</a>
      </article>
    </section>

    <section id="formDesktop">
      <article class="formContainer">
        <a id="welcomeMessage"> ¡Bienvenidx!</a>
        <a id="loginMessage"> Ingresa a tu cuenta</a>
        <a class="desktopText">Email</a>
        <input type="email" placeholder="john.snow@gmail.com" class="desktopInput"> 
        <a class="desktopText">Contraseña</a>
        <input type="password" placeholder="********" class="desktopInput"> 
        <article class="smallContainer">
          <article class="rememberMe"><input type="checkbox"><label class="smallText">Recuérdame</label></article>
          <a class = "smallText">Olvidé mi contraseña</a>
        </article>
        <button class= "loginDesktop">Ingresar</button>
        <button class = "googleButton">
          <img src="./images/googleIcon.png" class="googleLogo"> Ingresar con Google
        </button>
      </article>
      <article class="smallContainerDesktop">
        <p>¿No tienes una cuenta?</p>
        <a href="#/register">Regístrate</a>
      </article>
    </section>
    `;
  const sectionElement = document.createElement('section');
  sectionElement.setAttribute('class', 'home');
  sectionElement.innerHTML = viewHome;
  console.log(typeof (sectionElement));
  return sectionElement;
};
