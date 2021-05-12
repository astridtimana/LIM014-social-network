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

// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
