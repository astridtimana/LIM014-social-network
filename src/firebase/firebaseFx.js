/* eslint-disable no-trailing-spaces */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */

// Create User with Email and Password
// eslint-disable-next-line no-undef

export const createUser = (email, pass, name) => firebase.auth().createUserWithEmailAndPassword(email, pass)
  .then(() => {
    verificationMail();
    alert(`${name} tu usuario ha sido creado, verifica tu correo`);
  })
  .catch((error) => {
    const errorCode = error.code; //
    const errorMessage = error.message; // 'auth-invalid email'
    alert(`Error: ${errorCode}`);
    alert(`Error: ${errorMessage}`);
  }); 

const verificationMail = () => {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {
  }).catch((error) => {
    console.log(`Error: ${error}`);
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



// Envía un correo electrónico de restablecimiento de contraseña
// Para enviar un correo electrónico de restablecimiento de contraseña a un usuario, puedes usar el método sendPasswordResetEmail. Por ejemplo:

// const auth = firebase.auth();
// const emailAddress = 'user@example.com';

// auth.sendPasswordResetEmail(emailAddress).then(() => {
//   // Email sent.
// }).catch((error) => {
//   // An error happened.
// });




// Cuando un usuario accede a tu app, pasa la dirección de correo electrónico y la contraseña a signInWithEmailAndPassword:
// Web v8
// Web v9

// firebase.auth().signInWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });




// Para salir de la sesión de un usuario, llama a signOut de la siguiente manera:

// Web v8
// Web v9

// firebase.auth().signOut().then(() => {
//   // Sign-out successful.
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
