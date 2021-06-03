import { getCurrentUser } from '../firebase/firebaseFx.js';
import { deleteCommentFirebase, updateDocComment } from '../firebase/firestoreFx.js';

export default (comment, postId) => {
  const addComment = `
    <article id="commentPostWrapper">
        <img class="userPhotoComment" src="${comment.photo === null ? '../images/user.svg' : comment.photo}">
        <article class="commentWrap">
          <article id="userNameComment">${comment.userName}</article>
          <article class="commentPost">
            <article class= "comment-content">${comment.newComment}</article>
            <p id="saveComment-${comment.id}" class="saveCommentButton">Guardar</p>
          </article>
        </article>
        <section id= "deleteOrModifyCommentsWrapper" class="${comment.userID === getCurrentUser().uid ? 'show' : 'hidden'}"> 
          <i class="fas fa-ellipsis-h"></i>
          <div id="deleteOrModifyCommentArea">
            <p id="modifyComment" class="menu-comment">Modificar</p>
            <p id="deleteComment" class="menu-comment" >Eliminar</p>
          </div>
        </section>
    </article>`;

  const commentOnPost = document.createElement('div');
  commentOnPost.setAttribute('class', 'postToWall');
  commentOnPost.innerHTML = addComment;

  const deleteOrModifyComment = commentOnPost.querySelector('#deleteOrModifyCommentsWrapper');
  const deleteOrModifyArea = commentOnPost.querySelector('#deleteOrModifyCommentArea');
  const modifyComment = commentOnPost.querySelector('#modifyComment');
  const deleteComment = commentOnPost.querySelector('#deleteComment');
  const commentContent = commentOnPost.querySelector('.comment-content');
  const saveComment = commentOnPost.querySelector(`#saveComment-${comment.id}`);

  saveComment.style.display = 'none';
  deleteOrModifyArea.classList.add('hidden');

  deleteOrModifyComment.addEventListener('click', () => {
    deleteOrModifyArea.classList.toggle('hidden');
  });

  // ELIMINAR COMENTARIO
  deleteComment.addEventListener('click', () => {
    deleteCommentFirebase(postId, comment.id);
  });

  // MODIFICAR COMENTARIO
  modifyComment.addEventListener('click', (e) => {
    e.stopPropagation();
    saveComment.style.display = 'block';
    commentContent.contentEditable = true;
    commentContent.style.border = '#FFCC00 solid';
    // console.log(e);
    saveComment.addEventListener('click', () => {
      commentContent.contentEditable = false;
      deleteOrModifyArea.style.display = 'none';
      saveComment.style.display = 'none';
      commentContent.style.border = 'none';
      // console.log(postContent);
      updateDocComment(postId, comment.id, {
        newComment: commentContent.innerHTML,
      });
    });
  });

  return commentOnPost;
};
