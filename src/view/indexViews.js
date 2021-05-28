import Home from './home.js';
import Feed from './feed.js';
import { viewError } from './different.js';
import Register from './register.js';

const components = {
  home: Home,
  register: Register,
  feed: Feed,
  different: viewError,
};

export { components };
