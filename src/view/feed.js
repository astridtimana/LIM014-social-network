/* eslint-disable import/named */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-expressions */
import { logOut, getCurrentUser } from '../firebase/firebaseFx.js';
import templatePost from './posts.js';
/* console.log(templatePost()); */
import { newPost, listPostAll, onGetPosts } from '../firebase/firestoreFx.js';

// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

// const firestore = firebase.firestore();
// firestore.settings({ timestampsInSnapshots: true });

export default () => {
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
    </section>
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
    </section>
  

  <article class="user-info profile">
    <img alt="userimage" src="" alt="Foto de perfil">
    <h2 class="user-name profile-name">${getCurrentUser().name}</h2>
  </article>


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
  // const docRef = firestore.collection('posts');
  const buttonPost = divElement.querySelector('#bttPost');
  const wallArea = divElement.querySelector('#wall');

  // Cargar La informacion
  // window.addEventListener('DOMContentLoaded', () => {
  //   onGetPosts((querySnapshot) => {
  //     // postToWall.innerHTML = '';

  //     querySnapshot.forEach((doc) => {
  //       // const post = doc.data();
  //       const { ID, newPost } = doc.data();
  //       const postToWall = wallArea.appendChild(templatePost());
  //       const postText = postToWall.querySelector('#postContent');
  //       postText.innerHTML = newPost;
  //     });
  //   });
  // });

  // Cargar La informacion
  listPostAll().then((response) => {
    response.docs.forEach((doc) => {
      const { ID, newPost } = doc.data();
      console.log(ID);
      const postToWall = wallArea.appendChild(templatePost(ID));
      const postText = postToWall.querySelector('#postContent');
      postText.innerHTML = newPost;
    });
  });

  buttonPost.addEventListener('click', () => {
    // si el textarea está vacío, no guardar algo
    const textarea = divElement.querySelector('#post').value;
    // fx de firestore
    if (textarea.length > 0) {
      // newPost({ newPost: textarea })
      newPost({
        newPost: textarea,
        ID: getCurrentUser().uid,
      }).then((doc) => {
        const postToWall = wallArea.appendChild(templatePost(doc.id));
        const postText = postToWall.querySelector('#postContent');
        postText.innerHTML = textarea;
      })
        .catch((error) => { console.log('Got an error: ', error); });
      // const postText = postToWall.querySelector('#postContent');
      // postText.innerHTML = textarea;
    }
  });

  // firestore.collection('posts').get().then((snapshot) => {
  //   snapshot.docs.forEach((doc) => doc.data());
  // });

  return divElement;
};
