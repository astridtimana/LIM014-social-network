export default () => {
  const viewHome = `
    <header>
      <article id="logoContainer">
        <img class="logo" src="./images/colorwheel.png"><h1> PRIDE </h1>
      </article>
    </header>
    <section>
      <input type="email" placeholder="Correo" id="correo"> 
      <input type="password" placeholder="Contraseña" id="contraseña"> 
      <article class="smallContainer">
        <article id="recuérdame"><input type="checkbox"><label class="smallText">Recuérdame</label></article>
        <a class = "smallText">Olvidé mi contraseña</a>
      </article>
      <a class= "ingresar">Ingresar</a>
      <i class="fas fa-arrow-right"></i>
      <button class = "googleButton">Ingresar con Google</button>
      <article class="smallContainer">
      <p>¿No tienes una cuenta?</p>
      <a href="#/register">Regístrate</a>
      </article>
    </section>
    `;
  const sectionElement = document.createElement('section');
  sectionElement.setAttribute('class', 'home');
  sectionElement.innerHTML = viewHome;
  return sectionElement;
};
