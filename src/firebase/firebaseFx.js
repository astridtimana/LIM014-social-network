/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */


// Fx que crea un usuario
export const createUser = (email, pass) => firebase.auth().createUserWithEmailAndPassword(email, pass);

// Fx que envia correos de verificación
export const verificationMail = () => {
  const user = firebase.auth().currentUser;
  return user.sendEmailVerification()
    .then(() => ('se envió el email'))
    .catch((error) => error);
};

// Fx que permite el logIn desde cualquier proveedor
export const logIn = (email, pass) => {
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then((obj) => {
    // console.log(obj);
      if (obj.user.emailVerified) {
        window.location.hash = '#/feed';
      } else { alert('Verifica tu correo'); }
    })
    .catch(() => {
      alert('Dirección de correo electrónico o contraseña incorrectos.');
    });
};

// Fx que permite logIn con Google
export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
    .then(() => {
      window.location.hash = '#/feed'; // consumo aquí o en home.js?
    }).catch((error) => {
      console.log(error.message);
    });
};

// Fx que resetea el password del usuario
export const resetPasswordMail = (emailAddress) => {
  const auth = firebase.auth();
  auth.sendPasswordResetEmail(emailAddress)
    .then(() => {
    }).catch((error) => {
      console.log(error);
    });
};

export const logOut = () => {
  firebase.auth().signOut()
    .then(() => {
      ('Logging out');

      window.location.hash = '#/'; // consumo aquí o en feed.js?
    }).catch((error) => {
      console.log(error);
    });
};

// Information about the CURRENT USER
export const getCurrentUser = () => {
  // te capta info cuando solo estés logueada ... there is not much sense
  // xq ya hay un usuario
  // peroooooo CUANDO SE RECARGA LA PÁGINA LA INFO SE PIERDE, so, sí hay sense
  const user = firebase.auth().currentUser;
  let dataUser = '';
  if (user != null) {
    dataUser = {
      name: user.displayName,
      photoUrl: user.photoURL,
      uid: user.uid, 
    };
  }
  /* console.log(dataUser); */
  return dataUser;
};

// es un método observador: detecta al usuario logueado
export const userSessionActive = (callback) => firebase.auth().onAuthStateChanged(callback); 

