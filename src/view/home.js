export default () => {
  const viewHome = `
    <header>
      <h1> PRIDE </h1>
      <img class="" src="" alt="">
    </header>
    <section class= "home">
      <input type="email" placeholder="Correo" id="correo"> 
      <input type="password" placeholder="Contraseña" id="contraseña"> 
      <input type="checkbox" id="cbox2" value="second_checkbox" class=""> <label for="cbox2">Recuérdame</label>
      <a>Olvidé mi contraseña</a>
      <button>Ingresar</button>
      <i class="fas fa-arrow-right"></i>
      <button>Ingresar con Google</button>
      <p>¿No tienes una cuenta?</p>
      <a href="#/register">Regístrate</a>

      <button>Olvidé mi contraseña</button>
    </section>
    <figure class="">
        <img class="" src="" alt="">
    </figure>
    `;
  const sectionElement = document.createElement('section');
  sectionElement.innerHTML = viewHome;
  return sectionElement;
};
