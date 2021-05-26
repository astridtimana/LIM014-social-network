<<<<<<< HEAD
/* eslint-disable no-unused-vars */
export default () => {
  const addComment = `
      <article id="commentPostPhoto">
        <article class="userPhoto">
        </article>
        <article id="commentPost">
          <input id="CommentText"></input>
          <button id="comment" >comentar</button>
        </article>
      </article>`;

  const postExample = `
      <article id= postTrial>
          <section id= "postHeader">
            <section id="userInfoPost">
              <img class="userPhoto" src="./images/iconoperson.png" alt="userPhoto"> 
              <section id="postHeaderWrapper">
                <article id="userNamePost">User Name</article>
                <p id= "daysAgo">Days ago</p>
              </section>
            </section>
            <i class="fas fa-ellipsis-h"></i>
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
      </article> `;

  const postToWall = document.createElement('div');
  postToWall.setAttribute('class', 'postToWall');
  postToWall.innerHTML = postExample;
  /* const postText = postToWall.querySelector('#postContent'); */

  const likeButton = document.querySelector('#likeButton');
  const commentButton = document.querySelector('#commentButton');
  const postTrial = document.querySelector('#postTrial');

  // const textarea = divElement.querySelector('#post').value;

  commentButton.addEventListener('click', () => {
    const addingComment = document.createElement('div');
    addingComment.innerHTML = addComment;
    postTrial.appendChild(addingComment);
  /*  const postText = addingComment.querySelector('#commenText');
      postText.innerHTML = textarea; */
  });
  return postToWall;
=======
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
>>>>>>> 390b62037f3497382c18d17f8d5c489f4b2ed081
};
