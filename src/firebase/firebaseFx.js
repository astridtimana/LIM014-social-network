/* eslint-disable no-use-before-define */
/* eslint-disable no-console */

// const email = 'someone@example.com';
// const password = 'password';
const email = document.getElementById('arrowImgRegister').nodeValue;
const password = 'password';
/* document.getElementById('arrowImg').addEventListener('click', signUpUser);

function signUpUser() {
  console.log('wiw');
}
 */
// Create User with Email and Password
firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);

  console.log(email);
  console.log(password);
});
