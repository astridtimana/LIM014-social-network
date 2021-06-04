import { getCurrentUser } from '../firebase/firebaseFx.js';
import { deleteCommentFirebase, updateDocComment } from '../firebase/firestoreFx.js';

export default (comment, postId) => {
  const addComment = `
    <article id="commentPostWrapper">
        <img class="userPhotoComment" src="${comment.photo === null ? '../images/user.svg' : comment.photo}">
        <article class="commentWrap">
          <section class= "headerComment">
            <article id="userNameComment">${comment.userName}</article>
            <article class="dateComment">${comment.date}</article>
          </section>
          <article class="commentPost">
            <article class= "comment-content">${comment.newComment}</article>
            <p id="saveComment-${comment.id}" class="saveCommentButton">Guardar</p>
          </article>
        </article>
        <section id= "deleteOrModifyCommentsWrapper" class="${comment.userID === getCurrentUser().uid ? 'show' : 'hidden'}"> 
          <i class="fas fa-ellipsis-h"></i>
          <div id="deleteOrModifyCommentArea">
            <p id="modifyComment" class="menu-comment">Editar</p>
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

  // --------- FUNCIÓN PARA GUARDAR COMENTARIOS --------
  function savingComments(e) {
    e.preventDefault();
    commentContent.contentEditable = false;
    // deleteOrModifyArea.style.display = 'none';
    saveComment.style.display = 'none';
    commentContent.classList.remove('comment-content-2');
    // console.log(postContent);
    updateDocComment(postId, comment.id, {
      newComment: commentContent.innerHTML,
    });
  }

  // MODIFICAR COMENTARIO
  modifyComment.addEventListener('click', (e) => {
    e.stopPropagation();
    saveComment.style.display = 'block';
    commentContent.contentEditable = true;
    commentContent.classList.add('comment-content-2');
    // console.log(e);
    saveComment.addEventListener('click', () => {
      savingComments(e);
    });
    commentContent.addEventListener('keypress', (y) => {
      if (y.key === 'Enter') {
        savingComments(e);
      }
    });
  });

  return commentOnPost;
};
