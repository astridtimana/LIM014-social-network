const firebaseStorage = firebase.storage();

export const uploadFile = (path, file) => {
  // path = 'imagenes/foto1.png';
  const storage = firebaseStorage.ref(path);
  return storage.put(file);
};
