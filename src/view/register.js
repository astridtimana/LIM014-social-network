// será necesario hacer una página de js para el modal???.

export default () => {
  const viewRegister = `
      <header>
        <h2> Crear una cuenta </h2>
        <img class="" src="" alt="">
      </header>
      <section>
        <input type="email" placeholder="Nombre" id="nombre">
        <input type="email" placeholder="Correo" id="correo2"> 
        <input type="password" placeholder="Contraseña" id="contraseña2"> 
        <button>Ingresar</button>
        <button>Registrar con Google</button>
        <p>¿No tienes una cuenta?</p>
        <a href="#/registro">Regístrate</a>
  
        <button>Olvidé mi contraseña</button>
      </section>
      <figure class="">
          <img class="" src="" alt="">
      </figure>
      `;
  const divElement = document.createElement('div');
  divElement.innerHTML = viewRegister;
  return divElement;
};
