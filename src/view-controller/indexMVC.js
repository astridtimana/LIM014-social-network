/* eslint-disable no-lone-blocks */
/* eslint-disable import/named */
/* eslint-disable consistent-return */
// import { userSessionActive } from '../firebase/firebaseFx.js';
import { components } from '../view/indexViews.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/home': { return container.appendChild(components.home()); }
    case '#/register': { return container.appendChild(components.register()); }
    case '#/feed': { return container.appendChild(components.feed()); }
    case '': { return container.appendChild(components.home()); }
    case '#/': { return container.appendChild(components.home()); }

    default: { return container.appendChild(components.different()); }
  // userSessionActive((user) => {
  //   if (user) {
  //     // console.log('logged in');
  //     switch (route) {
  //       case '#/home': { return container.appendChild(components.feed()); }
  //       case '': { return container.appendChild(components.feed()); }
  //       case '#/': { return container.appendChild(components.feed()); }
  //       case '#/feed': { return container.appendChild(components.feed()); }
  //       default: { return container.appendChild(components.different()); }
  //     }
  //   } else {
  //     // console.log('logged out');
  //     switch (route) {
  //       case '#/home': { return container.appendChild(components.home()); }
  //       case '#/register': { return container.appendChild(components.register()); }
  //       case '': { return container.appendChild(components.home()); }
  //       case '#/': { return container.appendChild(components.home()); }

  //       default: { return container.appendChild(components.different()); }
  //     }
  //   }
  // });
  }
};

export { changeView };
