const firestore = firebase.firestore();

export const newPost = (doc) => {
  firestore.collection('posts').add(doc);
};

// obtener información de posts
export const getPostData = (post) => {
  firestore.collection('posts').doc(post).get();
};

// borrar commentario
export const deletePostFirestore = (idPost) => {
  firestore.collection('posts').doc(idPost).delete();
};
