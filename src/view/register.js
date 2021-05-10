// será necesario hacer una página de js para el modal???.

export default () => {
  const viewRegister = `
    <section id="registerMobile">
      
        <h2 id="createAccount"> Crear cuenta </h2>
        <img id="logoBig" src="./images/colorwheel.png">
        <input type="email" placeholder="Nombre" id="nombre">
        <input type="email" placeholder="Correo" id="correo2"> 
        <input type="password" placeholder="Contraseña" id="contraseña2"> 
        <a id="buttonRegister">Registrar</a>
        <img id="arrowImg" src="./images/arrow.png">
        <button id="buttonRegisterGoogle">Registrar con Google</button>
        <p>¿Tienes una cuenta?</p>
        <a id="logIn" href="#/registro">Iniciar sesión</a>
      
    <section>  
      `;
  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'register');
  divElement.innerHTML = viewRegister;
  return divElement;
};
