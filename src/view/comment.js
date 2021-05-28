export default (comment) => {
  const addComment = `
    <article id="commentPostWrapper">
        <img class="userPhoto" id="${comment.id}">
        <article id="commentPost">
        <input class= "commentText">${comment.newComment}</input>
        <button class="pressComment">comentar</button>
        </article>
    </article>`;

  const commentOnPost = document.createElement('div');
  commentOnPost.setAttribute('class', 'postToWall');
  commentOnPost.innerHTML = addComment;

  // const commentDiv = commentOnPost.querySelector('#commentPostWrapper');
  // const commentBtn = commentOnPost.querySelector('.pressComment');
  // const commentText = commentOnPost.querySelector('.commentTextt');

  // if (commentDiv.style.display === 'block') {
  //   window.addEventListener('click', (e) => {
  //     if (e.target !== commentBtn) {
  //       commentDiv.style.display = 'none';
  //       commentText.innerHTML = '';
  //     }
  //   });
  // }
  return commentOnPost;
};
