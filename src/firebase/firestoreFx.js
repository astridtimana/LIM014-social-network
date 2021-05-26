const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

export const newPost = (doc) => firestore.collection('posts').add(doc);
// export const newPost = (doc) => {
//   firestore.collection('posts').add(doc);
// };

export const listPostAll = () => firestore.collection('posts').get();

// obtener información de posts
export const getPostData = (post) => {
  firestore.collection('posts').doc(post).get();
};

// borrar commentario
export const deletePostFirestore = (idPost) => {
  firestore.collection('posts').doc(idPost).delete();
};

// obtener info de posts
