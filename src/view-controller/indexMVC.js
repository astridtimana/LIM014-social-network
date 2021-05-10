/* eslint-disable no-lone-blocks */
/* eslint-disable import/named */
/* eslint-disable consistent-return */
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
  }
};

export { changeView };
