/* eslint-disable no-console */
/* eslint-disable no-const-assign */
/* eslint-disable no-plusplus */
import { getCurrentUser } from '../firebase/firebaseFx.js';
import templateComment from './comment.js';
import {
  updateLike, deletePostFirebase, updateDocPost, listCommentAll, addDocComment,
} from '../firebase/firestoreFx.js';

// const firestore = firebase.firestore();

export default (post) => {
  const postView = `
    <article class="postId" id= "${post.id}">
        <section id= "postHeader">
          <section id="userInfoPost">
            <img class="userPhoto" src="${post.photo === null ? '../images/user.svg' : post.photo}" alt="userPhoto"> 
            <section id="postHeaderWrapper">
              <article id="userNamePost">${post.userName}</article>
              <p class= "daysAgo">${post.date}</p>
            </section>
          </section>
          <section id= "deleteOrModifyPostsWrapper" class="${post.userID === getCurrentUser().uid ? 'show' : 'hidden'}"> 
            <i class="fas fa-ellipsis-h" id="menuPost"></i>
            <ul id="deleteOrModifyArea">
              <p id="modifyPost">Editar</p>
              <p id="deletePost">Eliminar</p>
            </ul>
          </section>
        </section><hr>
        <section id="editPostWrapper">
          <p id= "postContent" > ${post.newPost}</p>
          ${post.file ? `<img class="image-post" src='${post.file}' />` : ''}
          
          <p id="savePost">Guardar</p>
        </section><hr>

              <section id="likeAndCommentSection"> 
                  <i class="${!post.likes.includes(getCurrentUser().uid) ? 'far' : 'fas'} fa-heart" id="heart-${post.id}"></i>
                  <p class="numberLikes">${post.likes.length}</p>

                <article class="likeAndCommentWrapper" > 
                  <i class="far fa-comment-dots" id="commentButton"></i>
                </article>
              </section>

      <section id="commentContainer">
        <section id="commentContainerWrap">
          <img class="userPhotoComment" src="${getCurrentUser().photo === null ? '../images/user.svg' : getCurrentUser().photo}">
          <form class="formComment">
            <input id="commentText-${post.id}" class="textOnComment" placeholder="Escribe un comentario..." required><i class="fas fa-share-square"id="sendComment-${post.id}"></i></input>
          </section>
        </section>
      </div>

      <div id="commentWall">
      </div>
    </article> 
    `;

  const postToWall = document.createElement('div');
  postToWall.setAttribute('class', 'postOnWall');
  postToWall.innerHTML = postView;

  const deleteOrModifyPost = postToWall.querySelector('#deleteOrModifyPostsWrapper');
  const deleteOrModifyArea = postToWall.querySelector('#deleteOrModifyArea');
  const modifyPost = postToWall.querySelector('#modifyPost');
  const deletePost = postToWall.querySelector('#deletePost');
  // const editPostWrapper = postToWall.querySelector('#editPostWrapper');
  const postContent = postToWall.querySelector('#postContent');
  const commentContainer = postToWall.querySelector('#commentContainer');
  const savePost = postToWall.querySelector('#savePost');
  const commentWall = postToWall.querySelector('#commentWall');
  // const formComment = postToWall.querySelector('.formComment');
  const commentOnPost = postToWall.querySelector(`#sendComment-${post.id}`);

  // --------- ESCONDE EL DIV DEL COMENTARIO ---------//
  commentContainer.classList.add('hidden');

  // ------- RENDERIZAR LOS COMENTARIOS EN CommentContainer ------//
  listCommentAll(post.id, (data) => {
    commentWall.innerHTML = '';
    data.forEach((comment) => {
      commentWall.appendChild(templateComment(comment, post.id));
    });
    return commentWall;
  });

  // -------------------- BOTÓN LIKE ----------------------- //
  function removeItemFromArr(arr, item) {
    const i = arr.indexOf(item);
    if (i !== -1) {
      arr.splice(i, 1);
    }
  }
  const likeButton = postToWall.querySelector(`#heart-${post.id}`);
  likeButton.addEventListener('click', () => {
    if (!post.likes.includes(getCurrentUser().uid)) {
      post.likes.push(getCurrentUser().uid);
    } else if (post.likes.includes(getCurrentUser().uid)) {
      removeItemFromArr(post.likes, getCurrentUser().uid);
    }
    updateLike(post.id, { likes: post.likes });
  });

  // ------------------ BOTÓN COMENTAR POST ---------------- //
  const commentButton = postToWall.querySelector('#commentButton');
  commentButton.addEventListener('click', (e) => {
    e.preventDefault();
    commentContainer.classList.toggle('hidden');
  });

  // --------------------Función COMENTAR EN POST-----------------//
  commentOnPost.addEventListener('click', (e) => {
    e.preventDefault();
    const textarea = postToWall.querySelector(`#commentText-${post.id}`).value;
    if (textarea.length > 0) {
      addDocComment(post.id, {
        newComment: textarea,
        userID: getCurrentUser().uid,
        date: new Date().toLocaleDateString(),
        userName: getCurrentUser().name,
        photo: getCurrentUser().photo,
      })
        .catch((error) => { console.log('Got an error: ', error); });
    }
  });

  deleteOrModifyArea.classList.add('hidden');
  savePost.style.display = 'none';

  deleteOrModifyPost.addEventListener('click', (e) => {
    e.preventDefault();
    deleteOrModifyArea.classList.toggle('hidden');
  });

  // ----------------- ELIMINAR POST ------------------- //
  deletePost.addEventListener('click', () => {
    deletePostFirebase(post.id);
  });

  // ----------------- MODIFICAR POST ------------------ //
  modifyPost.addEventListener('click', (e) => {
    e.preventDefault();
    savePost.style.display = 'block';
    postContent.contentEditable = true;
    postContent.style.border = '#FFCC00 solid';
  });
  savePost.addEventListener('click', (e) => {
    e.preventDefault();
    postContent.contentEditable = false;
    deleteOrModifyArea.style.display = 'none';
    postContent.style.border = 'none';
    savePost.style.display = 'none';
    // console.log(postContent);
    updateDocPost(post.id, {
      newPost: postContent.innerHTML,
    });
  });

  return postToWall;
};
