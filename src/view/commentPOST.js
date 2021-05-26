/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
import { getCurrentUser } from '../firebase/firebaseFx.js';
import templateComment from './comment.js';
import { deletePostFirestore } from '../firebase/firestoreFx.js';

const firestore = firebase.firestore();

export default (data) => {
  const postExample = `
    <article id= postTrial>
        <section id= "postHeader">
          <section id="userInfoPost">
            <img class="userPhoto" src="${getCurrentUser().photoUrl} alt="userPhoto"> 
            <section id="postHeaderWrapper">
              <article id="userNamePost">${getCurrentUser().name}</article>
              <p id= "daysAgo">Days ago</p>
            </section>
          </section>
          <section id= "deleteOrModifyPostsWrapper">
            <i class="fas fa-ellipsis-h"></i>
            <ul id="deleteOrModifyArea">
              <p id="modifyPost">Modificar Post</p>
              <p id="deletePost">Eliminar Post</p>
            </ul>
          </section>
        </section><hr>
        <section id= "postContent">${data.newPost}</section><hr>
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
    </article> `;

  const postToWall = document.createElement('div');
  postToWall.setAttribute('class', 'postToWall');
  // postToWall.setAttribute('data-id', getPostData(post));
  postToWall.innerHTML = postExample;

  // const postToWall = document.createElement('div');
  // postToWall.setAttribute('class', 'postToWall');
  // postToWall.innerHTML = postExample;

  // firestore.collection('posts').get().then((snapshot) => {
  //   snapshot.docs.forEach((doc) => (doc));
  // });

  const likeButton = postToWall.querySelector('#likeButton');
  const commentButton = postToWall.querySelector('#commentButton');
  const postTrial = postToWall.querySelector('#postTrial');

  commentButton.addEventListener('click', () => {
    postTrial.appendChild(templateComment());
  });

  const deleteOrModifyPost = postToWall.querySelector('.fa-ellipsis-h');
  const deleteOrModifyArea = postToWall.querySelector('#deleteOrModifyArea');
  const modifyPost = postToWall.querySelector('#modifyPost');
  const deletePost = postToWall.querySelector('#deletePost');

  deleteOrModifyArea.style.display = 'none';

  deleteOrModifyPost.addEventListener('click', () => {
    deleteOrModifyArea.style.display = 'block';
  });

  // postToWall.querySelector(`deleteOrModifyPostsWrapper-${postData.id}`)
  //   .addEventListener('click', () => {
  //     deletePost(postData.id);
  //   });

  //   modifyPost.addEventListener('click', (e) => {
  //     e.stopPropagation();
  //     const id = e.target.parentElement.getAttribute('data-id');
  //   });
  //   deletePost.addEventListener('click', () => {

  //   });

  return postToWall;
};
