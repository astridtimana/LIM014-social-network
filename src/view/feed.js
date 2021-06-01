/* eslint-disable import/named */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-expressions */
import {
  logOut, getCurrentUser, userSessionActive,
} from '../firebase/firebaseFx.js';
import templatePost from './posts.js';
// console.log(templatePost());
import { addDocPost, listPostAll, onGetPosts } from '../firebase/firestoreFx.js';

// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

// const firestore = firebase.firestore();
// firestore.settings({ timestampsInSnapshots: true });

export default (post) => {
  const viewFeed = `
  <header id="feedHeader">
      <nav id="navigatorMenu">
          <img id="feedLogo" src="./images/logomenu.png">
          <section class="search" id="search">
              <img id="searchIcon" src="./images/searchIcon.png">
              <input id="searchBar" type="text" placeholder="Encuentra a tus amigos..." name="search">
          </section>
          <label for="toggle">
            <i class="fas fa-bars" id="signOne"></i>
            <i class="fas fa-times" id="signTwo"></i>
          </label>
          <input type="checkbox" id="toggle" />
          <section class="nav">
            <article class="menu">
                <a href="#" class="active"> Inicio<img class="configIcon" id="favoriteIcon" src="./images/home.svg"></a>
                <a href="#" > Mi Perfil<img class="configIcon" id="profileIcon" src="./images/profile.png"></a>
                <a href="#"> Configuración <img class="configIcon" id="settingsIcon" src="./images/settings.png"></a>
                <a href="#"> Adicionales <img class="configIcon" id="favoriteIcon" src="./images/favorite.png"></a>
                <a id="logOut">Cerrar sesión <img class="configIcon" id="logOutIcon" src="./images/logout.png"></a>
            </article>
      
          </section>
      </nav>      
  
  </header>
            <section id="activitiesArea">
                <h3 id="activitiesTitle"> ACTIVIDADES </h3>
                <section class="activities">
                </section>
            </section>

            <section id="aditionalsArea">
                <section class="aditionals">
                </section>
            </section>  

  
              <article class="user-info profile">
                <img alt="userimage" src="" alt="Foto de perfil">
                <h2 class="user-name profile-name" id="nameUserProfile"></h2>
              </article>

    <form class="formPost">
        <textarea placeholder="¿En qué estás pensando?" id="post"></textarea>
        <button id="bttPost" type="submit">Publicar</button>
    </form>
    

    <div id="wall">
    </div>

    `;

  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'feed');
  divElement.innerHTML = viewFeed;

  // funcion temporal log out
  const buttonPride = divElement.querySelector('#feedLogo');
  buttonPride.addEventListener('click', () => {
    logOut();
  });

  // const userLogOut = divElement.querySelector('#logOut');
  // userLogOut.addEventListener('click', () => {
  //   logOut();
  // });

  // agregar nombre de usuario al loguearse
  divElement.querySelector('#nameUserProfile').innerHTML = getCurrentUser().name;

  // FIRESTORE
  // const docRef = firestore.collection('posts');
  const buttonPost = divElement.querySelector('#bttPost');
  const wallArea = divElement.querySelector('#wall');

  // renderizar posts en wall
  listPostAll((data) => {
    // console.log(data); trae la data del documento con sus fields.
    wallArea.innerHTML = '';
    data.forEach((post) => {
      // console.log(post);
      wallArea.appendChild(templatePost(post));
    });
  });

  buttonPost.addEventListener('click', (e) => {
    e.preventDefault();// para evitar que los datos no aparezcan cuando se refresque
    // si el textarea está vacío, no guardar algo
    const textarea = divElement.querySelector('#post').value;

    // fx de firestore
    // si el textarea está vacío, no guardar algo
    if (textarea.length > 0) {
      // newPost({ newPost: textarea })
      addDocPost({
        newPost: textarea,
        userID: getCurrentUser().uid,
        userName: getCurrentUser().name,
        date: new Date().toLocaleString(),
        likes: [],
      }).catch((error) => { console.log('Got an error: ', error); });
    }
    // if (getCurrentUser().uid === wallArea.querySelector(`#${post.userID}`)) {
    //   deleteOrModifyPost.style.display = 'block';
    // } else { deleteOrModifyPost.style.display = 'none'; }
  });

  return divElement;
};
