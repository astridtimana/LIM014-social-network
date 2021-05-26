export default () => {
  const addComment = `
    <article id="commentPostPhoto">
        <article class="userPhoto">
        </article>
        <article id="commentPost">
        <input></input>
        <button>comentar</button>
        </article>
    </article>`;

  const commentOnPost = document.createElement('div');
  commentOnPost.setAttribute('class', 'postToWall');
  commentOnPost.innerHTML = addComment;

  return commentOnPost;
};
