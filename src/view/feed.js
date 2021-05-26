/* eslint-disable import/named */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-expressions */
import { logOut, getCurrentUser } from '../firebase/firebaseFx.js';
import templatePost from './commentPOST.js';
/* console.log(templatePost()); */
// import { newPost } from '../firebase/firestoreFx.js';

// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

export default () => {
  /* const addComment = `
    <article id="commentPostPhoto">
      <article class="userPhoto">
      </article>
      <article id="commentPost">
        <input></input>
        <button>comentar</button>
      </article>
    </article>`; */

  /* const postExample = `
    <article id= postTrial>
        <section id= "postHeader">
          <section id="userInfoPost">
            <img class="userPhoto" src="./img/user.png alt="userPhoto">
            <section id="postHeaderWrapper">
              <article id="userNamePost">User Name</article>
              <p id= "daysAgo">Days ago</p>
            </section>
          </section>
          <section id= "deleteOrModifyPostsWrapper">
            <i class="fas fa-ellipsis-h"></i>
            <section id="deleteOrModifyArea">
              <p id="modifyPost">Modificar Post</p>
              <p id="deletePost">Eliminar Post</p>
            </section>
          </section>
        </section><hr>
        <section id= "postContent"> </section><hr>
        <section id="likeAndCommentSection">
            <article class="likeAndCommentWrapper" id="likeButton">
                <img class="likeAndComment" src="./images/Like.png">
                <p>Heart counter</p>
            </article>
            <article class="likeAndCommentWrapper" id="commentButton">
                <img class="likeAndComment" src="./images/Comment.png">
                <p>Comment counter</p>
            </article>
        </section>
    </article> `; */

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
  const docRef = firestore.collection('posts');
  const buttonPost = divElement.querySelector('#bttPost');
  const wallArea = divElement.querySelector('#wall');

  buttonPost.addEventListener('click', () => {
    // si el textarea está vacío, no guardar algo
    const textarea = divElement.querySelector('#post').value;
    // fx de firestore
    if (textarea.length > 0) {
      // newPost({ newPost: textarea })
      docRef.add({
        newPost: textarea,
        ID: getCurrentUser().uid,
      }).catch((error) => { console.log('Got an error: ', error); });

      const postToWall = wallArea.appendChild(templatePost());
      const postText = postToWall.querySelector('#postContent');
      postText.innerHTML = textarea;

      // COMMENT SECTION

      // const deleteOrModifyPost = document.querySelector('.fa-ellipsis-h');
      // const deleteOrModifyArea = document.querySelector('#deleteOrModifyArea');
      // const modifyPost = postToWall.querySelector('#modifyPost');
      // const deletePost = postToWall.querySelector('#deletePost');

      // deleteOrModifyArea.style.display = 'none';

      // deleteOrModifyPost.addEventListener('click', () => {
      //   deleteOrModifyArea.style.display = 'block';
      // });
      // const deletePostFirestore = (user) => {
      //   firebase.collection('posts').doc(user.).delete().then(() => {
      //     console.log('Document successfully deleted!');
      //   })
      //     .catch((error) => {
      //       console.error('Error removing document: ', error);
      //     });
      // };

      // modifyPost.addEventListener('click', (e) => {
      //   e.stopPropagation();
      //   let id = e.target.parentElement.getAttribute('data-id');
      // });

      // deletePost.addEventListener('click', () => {

      // });
    }
  });

  return divElement;
};
