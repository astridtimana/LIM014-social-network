/* eslint-disable no-console */
const firestore = firebase.firestore(); // desde firebase, voy a llamar algo llamado firestore
firestore.settings({ timestampsInSnapshots: true });

export const addDocPost = (doc) => firestore.collection('posts').add(doc);

export const listPostAll = (callback) => firestore.collection('posts').orderBy('date', 'desc').onSnapshot((querySnapshot) => {
  const post = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.data());
    post.push(doc.data());
  });
  callback(post);
  // console.log('Posts: ', post.join(', '));
});

// obtener información de posts
export const getPostData = (post) => {
  firestore.collection('posts').doc(post).get();
};

// borrar commentario
export const deletePostFirestore = (idPost) => {
  firestore.collection('posts').doc(idPost).delete();
};

// obtener info de posts
export const onGetPosts = (callback) => firestore.collection('posts').onSnapshot(callback);
