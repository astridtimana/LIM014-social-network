export default () => {
  const viewFeed = `
    <header id="feedHeader">
      <nav id="menuNavigator">
        <img id="feedLogo" src="./images/Logo grande.png">
        <section id="search">
          <img id="searchIcon" src="./images/searchIcon.png">
          <input id="searchBar" type="text" placeholder="Encuentra a tus amigos..." name="search">
        </section>
        <p id="profile"> Profile </p>
        <label for="menu-toggle">
          <div class="botonMenu">
            <img id="hamburguerBtn" src="./images/haburguerMenu.png">
          </div>
       </label>
       <input type="checkbox" id="menu-toggle"/>
          <ul id="trickMenu">
            <li><a href="#"> Configuración </a></li>
            <li><a href="#"> Adicionales </a></li>
          </ul>
      </nav>

    </header>
      
    <section id="feedConfigArea">
      <section class="feedConfig">
        <section class="feedConfigOption">
          <img class="configIcon" id="favoriteIcon" src="./images/favorite.png"> 
          <p>Inicio</p>
        </section>
        <section class="feedConfigOption">
          <img class="configIcon" id="profileIcon" src="./images/profile.png"> 
          <p> Mi perfil</p>
        </section>
        <section class="feedConfigOption">
          <img class="configIcon" id="settingsIcon" src="./images/settings.png"> 
          <p>Configuración</p>
        </section>
        <section class="feedConfigOption">
          <img class="configIcon" id="logOutIcon" src="./images/logout.png"> 
          <p>Salir</p>
        </section>

      </section>
    </section>

    <section id="activitiesArea">
      <h3 id="activitiesTitle"> ACTIVIDADES </h3>
      <section class="activities">
      </section>
    </section>

    <section id="aditionalsArea">
      <section class="aditionals">
      </section>
    </section>
    `;
  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'feed');
  divElement.innerHTML = viewFeed;
  return divElement;
};
