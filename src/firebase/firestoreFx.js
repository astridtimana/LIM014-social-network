/* eslint-disable no-undef */
/* eslint-disable no-console */
const firestore = firebase.firestore(); // desde firebase, voy a llamar algo llamado firestore
firestore.settings({ timestampsInSnapshots: true });

// ----- Añadir lista de fields en un documento de la colección posts -----
export const addDocPost = (newPost, userID, userName, photo, date, file, likes) => firestore.collection('posts').add({
  newPost, userID, userName, photo, date, file, likes,
});

// Kathy está trabajando aquí
export const updateLike = (docID, likes) => firestore.collection('posts').doc(docID).update(likes);

// ----- Añadir lista de fields en un documento de la colección comments -----
export const addDocComment = (docID, comment) => firestore.collection('posts').doc(docID).collection('comment').add(comment);

// ----- Agregar/actualizar field en un documento de la colección posts -----
export const updateDocPost = (docID, newField) => firestore.collection('posts').doc(docID).update(newField);

// ----- Agregar/actualizar field en un documento de la colección posts -----
export const updateDocComment = (postID, commentID, newField) => firestore.collection('posts').doc(postID)
  .collection('comment').doc(commentID)
  .update(newField);

// ----- Función para almacenar información sobre posts de forma descendente ----
export const listPostAll = (callback) => firestore.collection('posts').orderBy('date', 'desc').onSnapshot((querySnapshot) => {
  const post = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc);
    post.push({ id: doc.id, ...doc.data() });
  });
  callback(post);
  // console.log('Posts: ', post.join(', '));
});

export const listCommentAll = (idPost, callback) => firestore.collection(`posts/${idPost}/comment`)
  .orderBy('date', 'desc').onSnapshot((querySnapshot) => {
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
  firestore.collection('posts').doc(post).get();
};

// borrar POST
export const deletePostFirebase = (idPost) => {
  firestore.collection('posts').doc(idPost).delete();
};

// borrar COMENTARIO
export const deleteCommentFirebase = (idPost, idComment) => {
  firestore.collection('posts').doc(idPost).collection('comment').doc(idComment)
    .delete();
};

// obtener info de posts
export const onGetPosts = () => firestore.collection('posts').get();
// .then((snapshot) => {
//   snapshot.docs.forEach((doc) => doc.data());
// });
