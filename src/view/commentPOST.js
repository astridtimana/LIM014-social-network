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

  const postExample = `
    <article id= postTrial>
        <section id= "postHeader">
          <section id="userInfoPost">
            <img class="userPhoto" src="./img/user.png alt="userPhoto"> 
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

  const likeButton = postToWall.querySelector('#likeButton');
  const commentButton = postToWall.querySelector('#commentButton');
  const postTrial = postToWall.querySelector('#postTrial');

  commentButton.addEventListener('click', () => {
    const addingComment = document.createElement('div');
    addingComment.innerHTML = addComment;
    postTrial.appendChild(addingComment);
    // const postText = addingComment.querySelector('#postContent');
    // postText.innerHTML = textarea;
  });

  return postToWall;
};
