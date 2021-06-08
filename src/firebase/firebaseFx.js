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
>>>>>>> 69e7a0eb6c82e37f8f29868bf22d6cd3ec21f6d9
