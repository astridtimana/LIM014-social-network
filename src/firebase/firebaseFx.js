/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */

firebase.auth().languageCode = 'es';


// Fx que crea un usuario
export const createUser = (email, pass) => firebase.auth().createUserWithEmailAndPassword(email, pass);

// Fx que envia correos de verificación
export const verificationMail = () => {
  const user = firebase.auth().currentUser;
  return user.sendEmailVerification()
    .then(() => ('se envió el email'))
    .catch((error) => {
      console.log(`Error: ${error}`); // si hay un error, retornar como mensaje
    });
};

export const logIn = (email, pass, nodo) => firebase.auth().signInWithEmailAndPassword(email, pass);


export const sigInWithGoogle = () => {
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result);
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      window.location.hash = '#/feed';
    }).catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
    // ...
    });
};

// Configura la contraseña de un usuario
// Para configurar la contraseña de un usuario, puedes usar el método updatePassword. Por ejemplo:

// const user = firebase.auth().currentUser;
// const newPassword = getASecureRandomPassword();

// user.updatePassword(newPassword).then(() => {
//   // Update successful.
// }).catch((error) => {
//   // An error happened.
// });


const provider = new firebase.auth.GoogleAuthProvider();


// Envía un correo electrónico de restablecimiento de contraseña
// Para enviar un correo electrónico de restablecimiento de contraseña a un usuario, puedes usar el método sendPasswordResetEmail. Por ejemplo:

// const auth = firebase.auth();
// const emailAddress = 'user@example.com';

// auth.sendPasswordResetEmail(emailAddress).then(() => {
//   // Email sent.
// }).catch((error) => {
//   // An error happened.
// });




// Obtén el usuario con sesión activa
// La manera recomendada de obtener el usuario actual es establecer un observador en el objeto Auth:

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//   } else {
//     // No user is signed in.
//   }
// });
