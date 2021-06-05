/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

// CONFIGURA FIREBASE MOCK
import firebasemock from 'firebase-mock';
// const firebasemock = require('firebase-mock');
import {
  createUser,
  logIn,
  verificationMail,
  signInWithGoogle,
  logOut,
  resetPasswordMail,
  getCurrentUser,
} from '../src/firebase/firebaseFx.js';

const mockauth = new firebasemock.MockAuthentication();
const mockfirestore = new firebasemock.MockFirestore();
const mockstorage = new firebasemock.MockStorage();
mockauth.autoFlush();
// simula los mét y prop de firebase auth
global.firebase = new firebasemock.MockFirebaseSdk(
  null,
  () => mockauth,
  () => mockfirestore,
  () => mockstorage,
  null,
);

// CREATE USER
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

// VERIFICATION MAIL
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

// SIGN IN WITH GOOGLE
describe('Función para ingresar con Gmail', () => {
  it('Debería ser una función', () => {
    expect(typeof signInWithGoogle).toBe('function');
  });
  it('Debe logearse con Google', () => {
    signInWithGoogle()
      .then((user) => {
        expect(user.displayName).toBe(undefined);
      });
  });
});

// LOG IN
describe('Función para ingresar con correo electrónico', () => {
  it('Debería ser una función', () => {
    expect(typeof logIn).toBe('function');
  });
  it('Debe logearse con correo y contraseña', () => logIn('ben@example.com', 'examplePass')
    .then((user) => {
      /* console.log(user.email); */
      expect(user.email).toBe('ben@example.com');
    }));
});

// LOG OUT
describe('Log out', () => {
  it('Deberia salir de sesión', () => logOut()
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});

// RESETPASSWORD
describe('Función para restablecer la contraseña', () => {
  it('Deberia enviar un email para restablecer contraseña', () => {
    // this mocks the initializeApp on the firebase-admin,  we're calling out to firestore
    // You have to stub admin method to provide our admin with proper credentials
    const mockSendPasswordResetEmail = jest.fn();
    firebase.auth().sendPasswordResetEmail = mockSendPasswordResetEmail;
    resetPasswordMail('test@gmail.com');
    // verificar si fue llamado el metodo de firebase
    expect(mockSendPasswordResetEmail).toHaveBeenCalled();
    expect(mockSendPasswordResetEmail.mock.calls).toHaveLength(1); // BUSCAR!!!!
    // verificar si el metodo recibio como arg el email
    expect(mockSendPasswordResetEmail).toHaveBeenCalledWith('test@gmail.com');
  });
});

// GET CURRENT USER
describe('Función del usuario actual', () => {
  it('Debería devovler el usuario logeado', () => {
    const mockUser = {
      currentUser: { uid: '001' },
    };
    firebase.auth().currentUser = mockUser.currentUser;
    expect(getCurrentUser().uid).toEqual('001');
  });
});
