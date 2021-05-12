/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-unreachable */
// será necesario hacer una página de js para el modal???.

export default () => {
  const viewRegister = `
  <section id="registerMobile">
  <header id="headerCreate">
    <img id="logoBig" src="./images/colorwheel2.png">
    <h2 id="createAccount"> Crear cuenta </h2>
  </header>
  <section>
    <section id="formRegister">
      <input type="email" placeholder="Nombre" id="nombre">
      <input type="email" placeholder="Correo" id="correo2"> 
      <input type="password" placeholder="Contraseña" id="contraseña2"> 
    </section>
    <section id="buttonRegister">
      <a>Registrar</a>
      <button id=prueba onclick="enviar()" >
      <img id="arrowImgRegister" src="./images/arrow.png">
      </button>
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
    
    <input type="email" placeholder="Correo electrónico" id="correoDesktop"> 
    <input type="email" placeholder="Nombre y apellido" id="nameDesktop">
    <input type="password" placeholder="Contraseña" id="contraseñaDesktop"> 
    
    <button id="createAccount"> Regístrate</button>
    
    <p id="txtCondiciones">Al registrarte, aceptas nuestras <a href="">Condiciones</a>, la <a href="">Política de datos</a> y la <a href="">Política de cookies</a>.</p>
    
    <article class="smallContainerDesktop">
      <p>¿Tienes una cuenta?</p>
      <a id="logInDesktop" href="#/registro">Inicia sesión</a>
    </article>
    
    
      `;
  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'register');
  divElement.innerHTML = viewRegister;
  return divElement;
};
// const prueba = document.getElementById('arrowImgRegister');
// prueba.addEventListener('click', () => {
//   const email = document.getElementById('correo2').value;
//   const pass = document.getElementById('password').value;
//   alert(`email=${email}pass= ${pass}`);
// });
