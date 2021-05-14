export default () => {
  const viewFeed = `
    <header id="feedHeader">
      <nav id="menuNavigator">
        <img id="feedLogo" src="./images/Logo grande.png">
        <section id="search">
          <img id="searchIcon" src="./images/searchIcon.png">
          <input id="searchBar" type="text" placeholder="Encuentra a tus amigos..." name="search">
        </section>
        <p> Profile </p>
      </nav>
    </header>
      
    <section id="feedConfigArea">
      <section class="feedConfig">
        <img class="configIcon" id="favoriteIcon" src="./images/favorite.png">
        <img class="configIcon" id="profileIcon" src="./images/profile.png">
        <img class="configIcon" id="settingsIcon" src="./images/settings.png">
        <img class="configIcon" id="logOutIcon" src="./images/logOut.png">
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
