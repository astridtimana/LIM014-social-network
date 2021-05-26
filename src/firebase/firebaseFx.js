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

export const logIn = (email, pass) => firebase.auth().signInWithEmailAndPassword(email, pass);

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
    .then((result) => {
      /* console.log(result); */
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;
      const token = credential.accessToken; // This gives you a Google Access Token. You can use it to access the Google API.
      const user = result.user; // The signed-in user info.
      window.location.hash = '#/feed'; // consumo aquí o en home.js?
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email; // The email of the user's account used.
      const credential = error.credential; // The firebase.auth.AuthCredential type that was used.
    });
};


// Configura la contraseña de un usuario
// Para configurar la contraseña de un usuario, puedes usar el método updatePassword. Por ejemplo:

export const resetPasswordMail = (emailAddress) => {
  const auth = firebase.auth();

  auth.sendPasswordResetEmail(emailAddress)
    .then(() => {
      /* console.log('mail sent'); */
    }).catch((error) => {
      console.log(error);
      // An error happened.
    });
};

export const logOut = () => {
  firebase.auth().signOut()
    .then(() => {
      ('Logging out');

      window.location.hash = '#/home'; // consumo aquí o en feed.js?
    }).catch((error) => {
      // An error happened.
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
    document.querySelector('#nameUserProfile');
  }
  /* console.log(dataUser); */
  return dataUser;
};

// es un método observador: detecta al usuario logueado
export const userSessionActive = () => firebase.auth().onAuthStateChanged((user) => {
  let dataUser = '';
  if (user != null) {
    dataUser = {
      name: user.displayName,
      photoUrl: user.photoURL,
      uid: user.uid, 
    };
    document.querySelector('#nameUserProfile').innerHTML = user.displayName;
  }
});
