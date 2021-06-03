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
            <img class="userPhoto" src="../images/user.svg" alt="userPhoto"> 
            <section id="postHeaderWrapper">
              <article id="userNamePost">${post.userName}</article>
              <p class= "daysAgo">${post.date}</p>
            </section>
          </section>
          <section id= "deleteOrModifyPostsWrapper" class="${post.userID === getCurrentUser().uid ? 'show' : 'hide'}"> 
            <i class="fas fa-ellipsis-h" id="menuPost"></i>
            <ul id="deleteOrModifyArea">
              <p id="modifyPost">Editar</p>
              <p id="deletePost">Eliminar</p>
            </ul>
          </section>
        </section><hr>
        <section id="editPostWrapper">
          <p id= "postContent" > ${post.newPost}</p>
          <p id="savePost">Guardar</p>
        </section><hr>

              <section id="likeAndCommentSection">
                  <i class="icon-heart" id= "heart-${post.id}"></i>  
                  <p class="numberLikes">${post.likes.length}</p>

                <article class="likeAndCommentWrapper" id="commentButton"> 
                    <i class="far fa-comment"></i>
                </article>
              </section>

      <div id="commentContainer">
        <form class="formComment">
          <textarea id="commentText-${post.id}" required></textarea>
          <button type="submit" id="sendComment-${post.id}">Comentar</button>
        </form>
      </div>
      <div id="commentWall">
      </div>
    </article> `;

  const postToWall = document.createElement('div');
  postToWall.setAttribute('class', 'commentOnPost');
  postToWall.innerHTML = postView;

  const likeButton = postToWall.querySelector(`#heart-${post.id}`);
  const deleteOrModifyPost = postToWall.querySelector('#deleteOrModifyPostsWrapper');
  const deleteOrModifyArea = postToWall.querySelector('#deleteOrModifyArea');
  const modifyPost = postToWall.querySelector('#modifyPost');
  const deletePost = postToWall.querySelector('#deletePost');
  const editPostWrapper = postToWall.querySelector('#editPostWrapper');
  const postContent = postToWall.querySelector('#postContent');
  const commentContainer = postToWall.querySelector('#commentContainer');
  const savePost = postToWall.querySelector('#savePost');
  const commentWall = postToWall.querySelector('#commentWall');
  // const formComment = postToWall.querySelector('.formComment');
  const commentOnPost = postToWall.querySelector(`#sendComment-${post.id}`);
  const contador = post.likes;

  // enconder div de comentario
  commentContainer.classList.add('hidden');

  // renderizar comments en CommentContainer
  listCommentAll(post.id, (data) => {
    commentWall.innerHTML = '';
    data.forEach((comment) => {
      commentWall.appendChild(templateComment(comment, post.id));
    });
    return commentWall;
  });

  // CODIGO DANI
  // console.log(likeButton);
  // if (!contador.includes(getCurrentUser().uid)) {
  //   console.log('entré al if', likeButton);
  //   likeButton.classList.toggle('icon-heart-3');
  //   console.log('entré al if2', likeButton);
  // }

  function removeItemFromArr(arr, item) {
    const i = arr.indexOf(item);
    if (i !== -1) {
      arr.splice(i, 1);
    }
  }

  // Botón LIKE

  // likeButton.addEventListener('click', () => {
  //   console.log('entré al addevent');
  //   if (!contador.includes(getCurrentUser().uid)) {
  //     console.log('entré al if', likeButton);
  //     likeButton.classList.add('icon-heart-2');
  //     contador.push(getCurrentUser().uid);
  //   } else {
  //     console.log('entré al else', likeButton);
  //     likeButton.classList.remove('icon-heart-2');
  //     removeItemFromArr(contador, getCurrentUser().uid);
  //   }
  //   updateLike(post.id, { likes: contador });
  // });

  // Botón COMENTAR POST
  const commentButton = postToWall.querySelector('#commentButton');
  commentButton.addEventListener('click', (e) => {
    e.preventDefault();
    commentContainer.classList.toggle('hidden');
  });

  commentOnPost.addEventListener('click', (e) => {
    const textarea = postToWall.querySelector(`#commentText-${post.id}`).value;
    e.preventDefault();
    if (textarea.length > 0) {
      addDocComment(post.id, {
        newComment: textarea,
        userID: getCurrentUser().uid,
        date: new Date().toLocaleDateString(),
      }).catch((error) => { console.log('Got an error: ', error); });
    }
  });

  deleteOrModifyArea.classList.add('hidden');
  savePost.style.display = 'none';

  deleteOrModifyPost.addEventListener('click', (e) => {
    e.preventDefault();
    deleteOrModifyArea.classList.toggle('hidden');
  });

  // ELIMINAR POST
  deletePost.addEventListener('click', () => {
    deletePostFirebase(post.id);
  });

  // MODIFICAR POST
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

  // Mejorable click fuera del post
  // window.addEventListener('click', (y) => {
  //   console.log('in');
  //   console.log(y.target);
  //   if (y.target !== postToWall) {
  //     y.preventDefault();
  //     postContent.contentEditable = false;
  //     savePost.style.display = 'none';
  //     postContent.style.border = 'none';
  //     updateDocPost(post.id, {
  //       newPost: postContent.innerHTML,
  //     });
  //   }
  // });

  return postToWall;
};
