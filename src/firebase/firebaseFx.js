/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */

// Create User with Email and Password
// eslint-disable-next-line no-undef

export const createUser = (email, pass) => firebase.auth().createUserWithEmailAndPassword(email, pass)
  .catch((error) => {
    const errorCode = error.code; //
    const errorMessage = error.message; // 'auth-invalid email'
    alert(errorCode);
    alert(errorMessage);
  });
