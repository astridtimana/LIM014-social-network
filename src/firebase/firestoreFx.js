/* eslint-disable no-undef */
/* eslint-disable no-console */

// BUSCARRRRRRRRRRRRRRRRRRRRR SI SIRVE
/* firebase.firestore().settings({ timestampsInSnapshots: true }); */

// ----- Añadir lista de fields en un documento de la colección posts -----
export const addDocPost = (newPost, userID, userName, photo, date, file, likes) => firebase.firestore().collection('posts').add({
  newPost, userID, userName, photo, date, file, likes,
});

//
export const updateLike = (docID, likes) => firebase.firestore().collection('posts').doc(docID).update(likes);

// ----- Añadir lista de fields en un documento de la colección comments -----
export const addDocComment = (docID, comment) => firebase.firestore().collection('posts').doc(docID).collection('comment')
  .add(comment);

// ----- Agregar/actualizar field en un documento de la colección posts -----
export const updateDocPost = (docID, newField) => firebase.firestore().collection('posts').doc(docID).update(newField);

// ----- Agregar/actualizar field en un documento de la colección posts -----
export const updateDocComment = (postID, commentID, newField) => firebase.firestore().collection('posts').doc(postID)
  .collection('comment')
  .doc(commentID)
  .update(newField);

// ----- Función para almacenar información sobre posts de forma descendente ----
export const listPostAll = (callback) => firebase.firestore().collection('posts').orderBy('date', 'desc').onSnapshot((querySnapshot) => {
  const post = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc);
    post.push({ id: doc.id, ...doc.data() });
  });
  callback(post);
  // console.log('Posts: ', post.join(', '));
});

export const listCommentAll = (idPost, callback) => firebase.firestore().collection(`posts/${idPost}/comment`)
  .orderBy('date', 'asc').onSnapshot((querySnapshot) => {
    const comment = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc);
      comment.push({ id: doc.id, ...doc.data() });
    });
    callback(comment);
  // console.log('Posts: ', post.join(', '));
  });

// obtener información de posts
export const getPostData = (post) => {
  firebase.firestore().collection('posts').doc(post).get();
};

// borrar POST
export const deletePostFirebase = (idPost) => {
  firebase.firestore().collection('posts').doc(idPost).delete();
};

// borrar COMENTARIO
export const deleteCommentFirebase = (idPost, idComment) => {
  firebase.firestore().collection('posts').doc(idPost).collection('comment')
    .doc(idComment)
    .delete();
};

// obtener info de posts
export const onGetPosts = () => firebase.firestore().collection('posts').get();
// .then((snapshot) => {
//   snapshot.docs.forEach((doc) => doc.data());
// });
