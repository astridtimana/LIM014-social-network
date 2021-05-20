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
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // console.log(result);
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;
      const token = credential.accessToken; // This gives you a Google Access Token. You can use it to access the Google API.
      const user = result.user; // The signed-in user info.
      window.location.hash = '#/feed';
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

  auth.sendPasswordResetEmail(emailAddress).then(() => {
    console.log('mail sent');
  }).catch((error) => {
    console.log(error);
  // An error happened.
  });
};

export const logOut = () => {
  firebase.auth().signOut().then(() => {
    console.log('logging out');
  }).catch((error) => {
  // An error happened.
  });
};

const provider = new firebase.auth.GoogleAuthProvider();
