/* eslint-disable no-alert */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-expressions */
import { logOut } from '../firebase/firebaseFx.js';

// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

const firestore = firebase.firestore();

export default () => {
  const viewFeed = `
  <header id="feedHeader">
    <nav id="menuNavigator">
        <img id="feedLogo" src="./images/Logo grande.png">
        <section id="search">
            <img id="searchIcon" src="./images/searchIcon.png">
            <input id="searchBar" type="text" placeholder="Encuentra a tus amigos..." name="search">
        </section>
    </nav>    


    <section class="nav">
        <label for="toggle">&#9776</label>
        <input type="checkbox" id="toggle" />

        <article class="menu">
            <a href="#"> Perfil</a>
            <a href="#"> Configuración </a>
            <a href="#"> Adicionales </a>
            <button id="logOut">Cerrar sesión</button>
    
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
        </article>
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
    </section>
  </header>

    <div>
        <textarea placeholder="¿En qué estás pensando?" id="post"></textarea>
        <button id="bttPost">Publicar</button>
    </div>

    <div id="wall">
    </div>

    `;

  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'feed');
  divElement.innerHTML = viewFeed;

  const userLogOut = divElement.querySelector('#logOut');
  userLogOut.addEventListener('click', () => {
    logOut();
  });

  // FIRESTORE
  const docRef = firestore.doc('posts/postData');
  const buttonPost = divElement.querySelector('#bttPost');
  /* const wallArea = divElement.querySelector('#wall'); */
  buttonPost.addEventListener('click', () => {
    // si el textarea está vacío, no guardar algo
    const textarea = divElement.querySelector('#post').value;
    // fx de firestore
    console.log(`${textarea}Holi Maria Paz`);
    docRef.set({
      newPost: textarea,
    }).then(() => {
      console.log('Status saved');
    }).catch((error) => {
      console.log('Got an error: ', error);
    });
  });

  return divElement;
};
