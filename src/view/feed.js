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

export default () => {
  const photo = getCurrentUser().photo;
  const name = getCurrentUser().name;
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
    <main id="feedSection">
            <section id="activitiesArea">
                <h3 id="activitiesTitle"> ACTIVIDADES </h3>
                <section class="activities">
                </section>
            </section>

            <section id="aditionalsArea">
                <section class="aditionals">
                </section>
            </section>  
  
            <article id="user-info">

              <img class="userImage" src="${photo === null ? '../images/user.svg' : photo}" alt="Foto de perfil">

              <h2 class="user-name profile-name" id="nameUserProfile">${name}</h2>
              <article class="user-information">
                  <h3><h3>
              </article>
            </article>

      <form class="formPost">
          <img class="userPhotoFeed" src="${photo === null ? '../images/user.svg' : photo}" alt="userPhoto">
          <textarea placeholder="¿En qué estás pensando?" id="post"></textarea><hr>
          <img src= "../images/photo.png" id="uploadPhoto">
          <button id="bttPost" type="submit">Publicar</button>
      </form>
      

      <div id="wall">
      </div>
    </main>
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

  // renderizar posts en wall
  listPostAll((data) => {
    // console.log(data); trae la data del documento con sus fields.
    wallArea.innerHTML = '';
    data.forEach((post) => {
      /* console.log(post); */
      wallArea.appendChild(templatePost(post));
    });
    return wallArea;
  });

  buttonPost.addEventListener('click', (e) => {
    e.preventDefault();// para evitar que los datos no aparezcan cuando se refresque
    // si el textarea está vacío, no guardar algo
    const textarea = divElement.querySelector('#post').value;
    const textareaEmpty = divElement.querySelector('#post');
    // fx de firestore
    // si el textarea está vacío, no guardar algo
    if (textarea.length > 0) {
      // newPost({ newPost: textarea })
      addDocPost({
        newPost: textarea,
        userID: getCurrentUser().uid,
        userName: getCurrentUser().name,
        photo: getCurrentUser().photo,
        date: new Date().toLocaleString(),
        likes: [],
      })
        .then(() => {
          textareaEmpty.value = '';
        })
        .catch((error) => { console.log('Got an error: ', error); });
    }
  });

  return divElement;
};
