/* eslint-disable no-lone-blocks */
/* eslint-disable import/named */
/* eslint-disable consistent-return */
import { components } from '../view/index.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/home': { return container.appendChild(components.home()); }
    case '#/feed': { return container.appendChild(components.feed()); }

    default: { return container.appendChild(components.different()); }
  }
};

export { changeView };
