/* eslint-disable import/named */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-expressions */
import { logOut, getCurrentUser, userSessionActive } from '../firebase/firebaseFx.js';
import templatePost from './posts.js';
// console.log(templatePost());
import { addDocPost, listPostAll } from '../firebase/firestoreFx.js';

// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

// const firestore = firebase.firestore();
// firestore.settings({ timestampsInSnapshots: true });

export default () => {
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
        <button id="bttPost">Publicar</button>
    </section>

    <section id="wall"></section>
    
    

    <aside>
    </aside>
    </section>

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
  // const docRef = firestore.collection('posts');
  const buttonPost = divElement.querySelector('#bttPost');
  const wallArea = divElement.querySelector('#wall');

  buttonPost.addEventListener('click', (e) => {
    e.preventDefault();// para evitar que los datos no aparezcan cuando se refresque
    // Cargar La informacion
    /* .then((response) => {
    response.docs.forEach((doc) => {
      const { ID, newPost } = doc.data();
      console.log(ID);
      const postToWall = wallArea.appendChild(templatePost(ID));
      const postText = postToWall.querySelector('#postContent');
      postText.innerHTML = newPost;
    });
    }).catch((err) => {

    }); */

    // si el textarea está vacío, no guardar algo
    const textarea = divElement.querySelector('#post').value;
    // fx de firestore
    if (textarea.length > 0) {
      // newPost({ newPost: textarea })
      addDocPost({
        newPost: textarea,
        ID: getCurrentUser().uid,
        date: new Date(),
      }).catch((error) => { console.log('Got an error: ', error); });
    }
    /* buttonPost.reset(); */ // traido del video
  });
  const callback = (data) => {
    console.log(data);
    wallArea.innerHTML = '';
    data.forEach((post) => {
      wallArea.appendChild(templatePost(post));
    });
  };
  listPostAll(callback);
  /*   const postToWall = wallArea.appendChild(templatePost());
  const postText = postToWall.querySelector('#postContent');
  postText.innerHTML = textarea; */
  // firestore.collection('posts').get().then((snapshot) => {
  //   snapshot.docs.forEach((doc) => doc.data());
  // });

  return divElement;
};
