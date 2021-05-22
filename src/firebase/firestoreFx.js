const firestore = firebase.firestore();

export const newPost = (doc) => {
  firestore.collection('posts').add(doc);
};
