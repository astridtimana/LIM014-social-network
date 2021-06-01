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
    <article class="postId" id= "${post.userID}">
        <section id= "postHeader">
          <section id="userInfoPost">
            <img class="userPhoto" src="${post.photoUrl} alt="userPhoto"> 
            <section id="postHeaderWrapper">
              <article id="userNamePost">${post.userName}</article>
              <p id= "daysAgo">${post.date}</p>
            </section>
          </section>
          <section id= "deleteOrModifyPostsWrapper" class="${post.userID === getCurrentUser().uid ? 'show' : 'hide'}"> 
            <i class="fas fa-ellipsis-h"></i>
            <ul id="deleteOrModifyArea">
              <p id="modifyPost">Modificar Post</p>
              <p id="deletePost">Eliminar Post</p>
            </ul>
          </section>
        </section><hr>
        <section>
          <p id= "postContent" > ${post.newPost}</p><hr>
          <button id="savePost">Guardar</button>
        </section>

              <section id="likeAndCommentSection">
                  <i class="icon-heart"></i>  
                  <p class="numberLikes">0</p>


                <article class="likeAndCommentWrapper" id="commentButton">
                    <img class="likeAndComment" src="./images/Comment.png"> 
                    <p>Comment counter</p>
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

  const deleteOrModifyPost = postToWall.querySelector('#deleteOrModifyPostsWrapper');
  const deleteOrModifyArea = postToWall.querySelector('#deleteOrModifyArea');
  const modifyPost = postToWall.querySelector('#modifyPost');
  const deletePost = postToWall.querySelector('#deletePost');

  const postContent = postToWall.querySelector('#postContent');
  const commentContainer = postToWall.querySelector('#commentContainer');
  const savePost = postToWall.querySelector('#savePost');
  const commentWall = postToWall.querySelector('#commentWall');
  // const formComment = postToWall.querySelector('.formComment');
  const commentOnPost = postToWall.querySelector(`#sendComment-${post.id}`);

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

  // Botón LIKE
  const numberLikes = postToWall.querySelector('.numberLikes');
  const likeButton = postToWall.querySelector('.icon-heart');
  likeButton.addEventListener('click', (elem, doc) => {
    likeButton.classList.toggle('icon-heart-2');
    const contador = elem.counterLikes;
    if (!contador.includes(doc.userID)) {
      likeButton.classList.toggle('icon-heart-2');
      contador.push(doc.userID);
      updateLike(contador);
    } else if (contador.includes(doc.userID)) {
      contador = contador.filter((i) => i !== doc.userID);
      updateLike(contador);
    }
    numberLikes.innerHTML = doc.counterLikes;
  });

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

  deleteOrModifyArea.style.display = 'none';
  savePost.style.display = 'none';

  deleteOrModifyPost.addEventListener('click', () => {
    deleteOrModifyArea.style.display = 'block';
  });

  // ELIMINAR POST
  deletePost.addEventListener('click', () => {
    deletePostFirebase(post.id);
  });

  // MODIFICAR POST
  modifyPost.addEventListener('click', (e) => {
    e.stopPropagation();
    savePost.style.display = 'block';
    postContent.contentEditable = true;
    postContent.style.border = '#FFCC00 solid';
    // console.log(e);
    savePost.addEventListener('click', () => {
      postContent.contentEditable = false;
      deleteOrModifyArea.style.display = 'none';
      savePost.style.display = 'none';
      postContent.style.border = 'none';
      // console.log(postContent);
      updateDocPost(post.id, {
        newPost: postContent.innerHTML,
      });
    });
  });

  // window.addEventListener('click', (e) => {
  //   if (e.target !== savePost) {
  //     postContent.contentEditable = false;
  //     savePost.style.display = 'none';
  //     postContent.style.border = 'none';
  //   }
  // });

  return postToWall;
};
