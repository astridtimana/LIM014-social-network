/* eslint-disable no-console */
const firestore = firebase.firestore(); // desde firebase, voy a llamar algo llamado firestore
firestore.settings({ timestampsInSnapshots: true });

export const addDocPost = (doc) => firestore.collection('posts').add(doc);
export const setDocPost = (docID, newField) => firestore.collection('posts').doc(docID).update(newField);

export const listPostAll = (callback) => firestore.collection('posts').orderBy('date', 'desc').onSnapshot((querySnapshot) => {
  const post = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc);
    post.push({ id: doc.id, ...doc.data() });
  });
  callback(post);
  // console.log('Posts: ', post.join(', '));
});

// obtener información de posts
export const getPostData = (post) => {
  firestore.collection('posts').doc(post).get();
};

// borrar commentario
export const deletePostFirebase = (idPost) => {
  firestore.collection('posts').doc(idPost).delete();
};

// obtener info de posts
export const onGetPosts = () => firestore.collection('posts').get();
// .then((snapshot) => {
//   snapshot.docs.forEach((doc) => doc.data());
// });

export const addDocComment = (doc) => firestore.collection('doc').add(doc);
export const listCommentAll = (callback) => firestore.collection('comments')
  .orderBy('date', 'desc').onSnapshot((querySnapshot) => {
    const comment = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc);
      comment.push({ id: doc.id, ...doc.data() });
    });
    callback(comment);
  // console.log('Posts: ', post.join(', '));
  });
