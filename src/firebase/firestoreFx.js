const firestore = firebase.firestore(); // desde firebase, voy a llamar algo llamado firestore

export const newPost = (doc) => {
  firestore.collection('posts').add(doc);
};
