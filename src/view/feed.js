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
      <nav class="navigatorMenuFeed">
          
          <img id="feedPrideLogo" src="./images/logomenu.png"> 
          <label class="toggleFeed" for="toggle"><i class="fas fa-bars"></i></label>
          <input type="checkbox" id="toggle" />
            <article class="menuFeed">
                <a href="#">Inicio  <i class="fas fa-home"></i></a>
                <a href="#" > Mi Perfil <i class="fas fa-user-alt"></i></a>
                <a href="#" id="logOut">Cerrar sesión <i class="fas fa-sign-out-alt"></i></a>
            </article>
      </nav>      
  
  </header>
      <section class="activitiesFeed">
           <section id="activitiesArea">
                <h3 id="activitiesTitle"> ¡Mira las actividades! </h3>
                <section class="activities">
                </section>
            </section>

            <section id="aditionalsArea">
                <section class="aditionals"></section>
            </section>  

  
              <article class="user-info profile">
                <img alt="userimage" src="" alt="Foto de perfil">
                <h2 class="user-name profile-name" id="nameUserProfile"></h2>
              </article>

    <section>
        <textarea placeholder="¿En qué estás pensando?" id="post" ></textarea>
        <button id="bttPost" type="submit">Publicar</button>
    </section>

    <section id="wall"></section>
    
    

    <aside>
    </aside>
    </section>

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
        counterLikes: 1, // Kathy está trabajando aquí
      }).catch((error) => { console.log('Got an error: ', error); });
    }
    // if (getCurrentUser().uid === wallArea.querySelector(`#${post.userID}`)) {
    //   deleteOrModifyPost.style.display = 'block';
    // } else { deleteOrModifyPost.style.display = 'none'; }
  });

  return divElement;
};
