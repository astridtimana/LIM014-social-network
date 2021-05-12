/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
// Este es el punto de entrada de tu aplicacion
/*
import { myFunction } from './lib/index.js';

myFunction(); */

import { changeView } from './view-controller/indexMVC.js';
// import { firebaseConfig } from './firebase/configFireBase.js';

const navigator = document.getElementById('navigator');

const init = () => {
  navigator.innerHTML = '';
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init);
/*
function signUpUser() {
  console.log('wiw');
}

document.querySelector('#arrowImgRegister').addEventListener('click', signUpUser); */

const prueba = document.getElementById('arrowImgRegister');
prueba.addEventListener('click', () => {
  const email = document.getElementById('correo2').value;
  const pass = document.getElementById('password').value;
  alert(`email=${email}pass= ${pass}`);
});
