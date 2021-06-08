/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */

// ------------------ FUNCIÓN QUE CREA UN USUARIO -------------------------- //
export const createUser = (email, pass) => firebase.auth().createUserWithEmailAndPassword(email, pass);

// ------------------ FUNCIÓN QUE ENVÍA CORREO DE VERIFICACIÓN ------------- //
export const verificationMail = () => {
  const user = firebase.auth().currentUser;
  return user.sendEmailVerification();
};

// -------- FUNCIÓN QUE PERMITE EL LOGIN DESDE CUALQUIER PROVEEDOR --------- //
export const logIn = (email, pass) => firebase.auth().signInWithEmailAndPassword(email, pass);

// ----------------- FUNCIÓN QUE PERMITE LOGIN CON GOOGLE ------------------ //
export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
    .then(() => {
      window.location.hash = '#/feed'; // consumo aquí o en home.js?
    });
};

// ---------------- FUNCIÓN QUE RESETEA EL PASSWORD DEL USUARIO -------------- //
export const resetPasswordMail = (emailAddress) => {
  const auth = firebase.auth();
  return auth.sendPasswordResetEmail(emailAddress);
};

// ---------------- FUNCIÓN QUE CIERRA LA SESSIÓN -------------- //
export const logOut = () => {
  const auth = firebase.auth();
  return auth.signOut();
};

// -------- FUNCIÓN QUE CONTIENE INFORMACIÓN EN UN OBJETO DEL CURRENT USER --------//
export const getCurrentUser = () => {
  const user = firebase.auth().currentUser;
  let dataUser = '';
  if (user != null) {
    dataUser = {
      name: user.displayName,
      photo: user.photoURL,
      uid: user.uid, 
    };
  }
  /* console.log(dataUser); */
  return dataUser;
};

export const userSessionActive = (callback) => firebase.auth().onAuthStateChanged(callback); 
