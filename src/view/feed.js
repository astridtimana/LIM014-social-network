/* eslint-disable no-alert */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-expressions */
import { logOut, getCurrentUser, userSessionActive } from '../firebase/firebaseFx.js';
import templatePost from './commentPOST.js';
/* console.log(templatePost()); */

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

                          <article class="user-info profile">
                              <img alt="userimage" src="" alt="Foto de perfil">
                              <h2 class="user-name profile-name" id="nameUserProfile"></h2>
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

  userSessionActive();

  const userLogOut = divElement.querySelector('#logOut');
  userLogOut.addEventListener('click', () => {
    logOut();
  });

  // FIRESTORE
  const docRef = firestore.collection('posts');
  const buttonPost = divElement.querySelector('#bttPost');
  const wallArea = divElement.querySelector('#wall');

  buttonPost.addEventListener('click', (e) => {
    e.preventDefault();// para evitar que los datos no aparezcan cuando se refresque
    // si el textarea está vacío, no guardar algo
    const textarea = divElement.querySelector('#post').value;
    // fx de firestore
    if (textarea.length > 0) {
      // newPost({ newPost: textarea })
      docRef.add({
        newPost: textarea,
        ID: getCurrentUser().uid,
      }).catch((error) => { console.log('Got an error: ', error); });
      const postToWall = document.createElement('div');
      postToWall.setAttribute('class', 'postToWall');
      postToWall.innerHTML = templatePost();
      wallArea.appendChild(postToWall);
      const postText = postToWall.querySelector('#postContent');
      postText.innerHTML = textarea;

      const likeButton = postToWall.querySelector('#likeButton');
      const commentButton = postToWall.querySelector('#commentButton');
      const postTrial = postToWall.querySelector('#postTrial');

      // const textarea = divElement.querySelector('#post').value;

      commentButton.addEventListener('click', () => {
        const addingComment = document.createElement('div');
        addingComment.innerHTML = addComment;
        postTrial.appendChild(addingComment);
        // const postText = addingComment.querySelector('#postContent');
        // postText.innerHTML = textarea;
      });
    }
    /* buttonPost.reset(); */ // traido del video
  });

  return divElement;
};
