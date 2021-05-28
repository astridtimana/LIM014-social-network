/* eslint-disable no-lone-blocks */
/* eslint-disable import/named */
/* eslint-disable consistent-return */
import { userSessionActive } from '../firebase/firebaseFx.js';
import { deletePostFirebase } from '../firebase/firestoreFx.js';
import { components } from '../view/indexViews.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      switch (route) {
        case '#/home': { return container.appendChild(components.feed()); }
        case '#/feed': { return container.appendChild(components.feed()); }
        case '': { return container.appendChild(components.feed()); }
        case '#/': { return container.appendChild(components.feed()); }

        default: { return container.appendChild(components.different()); }
      }
    } else {
      switch (route) {
        case '#/home': { return container.appendChild(components.home()); }
        case '#/register': { return container.appendChild(components.register()); }
        case '': { return container.appendChild(components.home()); }
        case '#/': { return container.appendChild(components.home()); }

        default: { return container.appendChild(components.different()); }
      }
    }
  });
};

export { changeView };
