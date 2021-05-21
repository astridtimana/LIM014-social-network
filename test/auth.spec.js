/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
// TEST DE LA FUNCIÓN CREATEUSER
import {
  // eslint-disable-next-line no-unused-vars
  createUser, logIn, verificationMail, signInWithGoogle,
} from '../src/firebase/firebaseFx.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
const mockfirestore = new firebasemock.MockFirestore();
const mockstorage = new firebasemock.MockStorage();
mockauth.autoFlush();
// simula los mét y prop de firebase auth
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

global.firebase = mocksdk;

describe('Función que crea un nuevo usuario sin tener cuenta de Google', () => {
  it('Debería ser una función', () => {
    expect(typeof createUser).toBe('function');
  });
  it('Debería crear un usuario con el email ben@example.com y contraseña examplePass', () => createUser('ben@example.com', 'examplePass')
    .then((user) => {
      /* console.log(user); */
      expect(user.email).toBe('ben@example.com');
    }));
});

describe('Función que permite verificar el correo', () => {
  it('Debería ser una función', () => {
    expect(typeof verificationMail).toBe('function');
  });
  it('verificando email', () => {
    const sendEmailVerificationMock = jest.fn();
    firebase.auth().currentUser = { sendEmailVerification: sendEmailVerificationMock.mockResolvedValue() };
    verificationMail().then((message) => {
      expect(message).toBe('se envió el email');
    });
  });
});

// HELP
describe('Función para ingresar con Gmail', () => {
  it('Debería ser una función', () => {
    expect(typeof signInWithGoogle).toBe('function');
  });
  it('Debe logearse con Google', () => {
    const signInWithGoogleMock = jest.fn();
    firebase.auth().credential = { signInWithGoogle: signInWithGoogleMock.mockResolvedValue() };
    signInWithGoogle()
      .then((user) => {
        /* console.log(user); */
        expect(user.displayName).toBe(undefined);
      });
  });
});

describe('Función para ingresar con correo electrónico', () => {
  it('Debería ser una función', () => {
    expect(typeof logIn).toBe('function');
  });
  it('Debe logearse con correo y contraseña', () => logIn('ben@example.com', 'examplePass')
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
    }));
});
