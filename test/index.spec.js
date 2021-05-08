// importamos la funcion que vamos a testear
// import { myFunction } from '../src/lib/index';
// import { template } from '@babel/core';
import Home from '../src/view/home';

describe('Función home', () => {
  it('debería ser una función', () => {
    expect(typeof Home).toBe('function');
  });
  it('debería retornar Html strings ', () => {
    expect(Home()).toEqual(expect.any(Object));
  });
});
