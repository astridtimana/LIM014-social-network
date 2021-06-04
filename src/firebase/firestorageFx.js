export const uploadFile = (path, file) => firebase.storage().ref(path).put(file);
