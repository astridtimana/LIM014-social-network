// Este es el punto de entrada de tu aplicacion
/*
import { myFunction } from './lib/index.js';

myFunction(); */

import { changeView } from './view-controller/indexMVC.js';

const navigator = document.getElementById('navigator');

const init = () => {
  navigator.innerHTML = '';
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init);
