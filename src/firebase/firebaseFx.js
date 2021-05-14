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
