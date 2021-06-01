import { getCurrentUser } from '../firebase/firebaseFx.js';
import { deleteCommentFirebase, updateDocComment } from '../firebase/firestoreFx.js';

export default (comment, postId) => {
  const addComment = `
    <article id="commentPostWrapper">
        <img class="userPhotoComment" src="./images/user.svg">
        <section id= "deleteOrModifyCommentsWrapper" class="${comment.userID === getCurrentUser().uid ? 'show' : 'hide'}"> 
        <i class="fas fa-ellipsis-h"></i>
        <div id="deleteOrModifyCommentArea">
          <p id="modifyComment">Modificar Post</p>
          <p id="deleteComment">Eliminar Post</p>
        </div>
    </section>
        <article id="commentPost">
          <article class= "comment-content">${comment.newComment}</article>
          <button id="saveComment-${comment.id}" class="saveCommentButton">Guardar</button>
        </article>
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

  deleteOrModifyComment.addEventListener('click', () => {
    deleteOrModifyArea.style.display = 'block';
  });

  // ELIMINAR POST
  deleteComment.addEventListener('click', () => {
    deleteCommentFirebase(postId, comment.id);
  });

  // MODIFICAR POST
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
