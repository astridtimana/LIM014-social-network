/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/named */
/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
// importamos la funcion que vamos a testear
// import { myFunction } from '../src/lib/index';
// import { template } from '@babel/core';

import { createUser } from '../src/firebase/firebaseFx.js';
import Home from '../src/view/home.js';
import Register from '../src/view/register.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
const mockfirestore = new firebasemock.MockFirestore();
const mockstorage = new firebasemock.MockStorage();
const mocksdk = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  null,
  // use null if your code does not use AUTHENTICATION
  () => mockauth,
  // use null if your code does not use FIRESTORE
  () => mockfirestore,
  // use null if your code does not use STORAGE
  () => mockstorage,
  // use null if your code does not use MESSAGING
  null,
);
mockauth.autoFlush(); // ?
global.firebase = mocksdk;

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
    expect(Register().children).toHaveLength(1);
  });
});

/* mocksdk.auth().getUserByEmail('ben@example.com').then((user) => {
  console.assert(user, 'ben was created');
}); */

// TEST DE LA FUNCIÓN CREATEUSER
describe('Función que crea un nuevo usuario sin tener cuenta de Google', () => {
  it('Debería ser una función', () => {
    expect(typeof createUser).toBe('function');
  });
  it('Debería crear un usuario con el email ben@example.com y contraseña examplePass', () => createUser('ben@example.com', 'examplePass')
    .then((user) => {
      /*  console.log(res); */
      /* expect(user.name).toBe('ben'); */
      expect(user.email).toBe('ben@example.com');
      expect(user.password).toBe('examplePass');
    }));
});
/*
describe('Función que permite verificar el correo'), () => {
  it('Debería ser una función', () => {
    expect(typeof verificationMail).toBe('function');
  });
}; */
