/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import MockFirebase from 'mock-cloud-firestore';
import {
  addDocComment,
  addDocPost,
  listCommentAll,
  listPostAll,
  updateLike,
  updateDocPost,
  updateDocComment,
  deletePostFirebase,
  deleteCommentFirebase,
} from '../src/firebase/firestoreFx.js';

// datos simulados que les paso para que pueda validarlo
const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        id_001: {
          date: '',
          file: '',
          likes: [],
          newPost: 'texto en muro',
          photo: '',
          userID: '001',
          userName: 'Kathy',

          __collection__: {
            comment: {
              __doc__: {
                cid_001: {
                  date: '',
                  newComment: 'texto en comentario',
                  photo: '',
                  userID: '001',
                  userName: 'Kathy',
                  pid: 'id_001',
                },
              },
            },
          },
        },
      },
    },
  },
};

// se necesita simular el tiempo ... tenemos un snapshot vigente y
// te lo digo a través de esta propiedad
global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

// CREAR UNA COLECCIÓN DE DATOS POR POST
describe('Función fireStore para crear posts', () => {
  it('Debería crear una nueva publicación', (done) => addDocPost('texto en muro', '001', 'Kathy', '', '', '', [])
    .then(() => listPostAll(
      (data) => {
        // verificar que
        const result = data.find((posts) => posts.newPost === 'texto en muro');
        expect(result.newPost).toBe('texto en muro');
        done(); // ES LA PROMESA QUE LE DICE AL TEST QUE NO SE QUEDE ESPERANDO A LA OTRA PROMESA
      },
    )));
});

// CREAR UNA SUB COLECCIÓN DE DATOS POR COMMENT
describe('Función fireStore para crear comments', () => {
  it('Debería crear un comentario en una publicación', (done) => addDocComment('id_001', 'texto en comentario')
    .then(() => listCommentAll('id_001',
      (data) => {
        // verificar que
        const result = data.find((comment) => comment.newComment === 'texto en comentario');
        expect(result.newComment).toBe('texto en comentario');
        done();
      })));
});

// DA 'ME GUSTA' A UN POST
describe('Función que permite dar likes', () => {
  it('Debería ser una función', () => {
    expect(typeof updateLike).toBe('function');
  });
  it('Debería reaccionar con un like', (done) => updateLike('id_001', { likes: ['N5tuPZqCbIMUf4LkrgUhMRRpjiz1', 'N5tuPZqCbIMUf4LkrgUhMRRpji2'] })
    .then(() => listPostAll((data) => {
      // console.log(data);
      const result = data.find((post) => post.id === 'id_001');
      expect(result.likes).toHaveLength(2);
      done();
    })));
});

// MODIFICA UN POST
describe('Función que permite actualizar un documento de la colección de posts', () => {
  it('Debería ser una función', () => {
    expect(typeof updateDocPost).toBe('function');
  });
  it('Debería modificar mi post', (done) => updateDocPost('id_001', { newPost: 'texto en muro 123' })
    .then(() => listPostAll((data) => {
      // console.log(data);
      const result = data.find((posts) => posts.id === 'id_001');
      expect(result.newPost).toBe('texto en muro 123');
      done();
    })));
});

// MODIFICA UN COMENTARIO
describe('actualizar el comentario', () => {
  it('Debería actualizar un comentario', (done) => updateDocComment('id_001', 'cid_001', { newComment: 'texto 2 en comentario' })
    .then(() => listCommentAll('id_001',
      (data) => {
        const result = data.find((comment) => comment.newComment === 'texto 2 en comentario');
        expect(result.newComment).toBe('texto 2 en comentario');
        done();
      })));
});

// ELIMINA UN POST
describe('Función fireStore para borrar posts', () => {
  it('Debería borrar una publicación', (done) => deletePostFirebase('id_001')
    .then(() => listPostAll(
      (data) => {
        const result = data.find((post) => post.id === 'id_001');
        expect(result).toEqual(undefined);
        done();
      },
    )));
});

// ELIMINA UN COMENTARIO
describe('Función fireStore para borrar comentarios', () => {
  it('Debería poder eliminar un comentario', (done) => deleteCommentFirebase('id_001', 'cid_001')
    .then(() => listCommentAll('id_001',
      (data) => {
        const result = data.find((comment) => comment.id === 'cid_001');
        expect(result).toBe(undefined);
        done();
      })));
});
