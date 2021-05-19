/* eslint-disable import/no-named-as-default-member */
// importamos la funcion que vamos a testear
// import { myFunction } from '../src/lib/index';
// import { template } from '@babel/core';
import Home from '../src/view/home';
import Register from '../src/view/register';

describe('Función home', () => {
  it('debería ser una función', () => {
    expect(typeof Home).toBe('function');
  });
  it('debería retornar Html strings ', () => {
    expect(Home()).toEqual(expect.any(Object));
  });
});

describe('Función register', () => {
  it('debería ser una función', () => {
    expect(typeof Register).toBe('function');
  });
  it('debería retornar Html strings ', () => {
    expect(Register()).toEqual(expect.any(Object));
  });
});
