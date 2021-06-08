/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
// Este es el punto de entrada de tu aplicacion

import { changeView } from './view-controller/indexMVC.js';
// import { firebaseConfig } from './firebase/configFireBase.js';

const navigator = document.getElementById('navigator');

// const init = () => {
//   navigator.innerHTML = '';
//   changeView(window.location.hash);
//   window.addEventListener('hashchange', () => changeView(window.location.hash));
// };
const init = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      changeView(window.location.hash);
    } else {
      window.location.hash = '#/home';
    }
  });
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init);
