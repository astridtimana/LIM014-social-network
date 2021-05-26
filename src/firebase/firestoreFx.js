const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

export const newPost = (doc) => firestore.collection('posts').add(doc);

export const listPostAll = () => firestore.collection('posts').get();
