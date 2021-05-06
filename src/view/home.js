export default () => {
  const viewHome = `
    <header>
      <h1> PRIDE </h1>
      <img class="" src="" alt="">
    </header>
    <section>
      <input type="email" placeholder="Correo" id="correo"> 
      <input type="password" placeholder="Contraseña" id="contraseña"> 
      <button>Ingresar</button>
      <button>Ingresar con Google</button>
      <p>¿No tienes una cuenta?</p>
      <a href="#/register">Regístrate</a>

      <button>Olvidé mi contraseña</button>
    </section>
    <figure class="">
        <img class="" src="" alt="">
    </figure>
    `;
  const divElement = document.createElement('div');
  divElement.innerHTML = viewHome;
  return divElement;
};
