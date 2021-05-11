// será necesario hacer una página de js para el modal???.

export default () => {
  const viewRegister = `

    <section id="registerDesktop">
      <section id="prideImageRegister">
        <img id="lgtbiqRegister" src="./images/lgtbiq.png">
      </section>
      <section id="formRegisterDesktop">
        <p>Regístrate para ver fotos y videos de tus amigos.</p>
        <button id="buttonRegisterGoogle">Iniciar sesión con Google</button>
        <input type="email" placeholder="Correo" id="correo2"> 
        <input type="email" placeholder="Nombre" id="nombre">
        <input type="password" placeholder="Contraseña" id="contraseña2"> 
        <button id="createAccount"> Regístrate</button>
        <p>Al registrarte, aceptas nuestras Condiciones, la Poítica de datos y la Política de cookies.</p>
        <p>¿Tienes una cuenta?</p>
        <a id="logInDesktop" href="#/registro">Iniciar sesión</a>
      </section>
    <section>  



      `;
  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'register');
  divElement.innerHTML = viewRegister;
  return divElement;
};
