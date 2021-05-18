/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/named */
/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
// importamos la funcion que vamos a testear
// import { myFunction } from '../src/lib/index';
// import { template } from '@babel/core';

import Home from '../src/view/home.js';
import Register from '../src/view/register.js';

// TEST DE LA FUNCIÓN EN EL VIEW HOME
describe('Función home', () => {
  it('debería ser una función', () => {
    expect(typeof Home).toBe('function');
  });
  it('debería retornar Html strings ', () => {
    expect(Home()).toEqual(expect.any(Object));
  });
  it('debería tener solo 3 contenedores hijos', () => {
    expect(Home().children).toHaveLength(2);
  });
});

// TEST DE LA FUNCIÓN EN EL VIEW REGISTER
describe('Función register', () => {
  it('debería ser una función', () => {
    expect(typeof Register).toBe('function');
  });
  it('debería retornar Html strings ', () => {
    expect(Register()).toEqual(expect.any(Object));
  });
  it('debería tener solo 3 contenedores hijos', () => {
    expect(Register().children).toHaveLength(4);
  });
});
