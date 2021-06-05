/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import MockFirebase from 'mock-cloud-firestore';
import {
  addDocPost,
  listPostAll,
  updateLike,
  getPostData,
  updateDocPost,
  updateDocComment,
  // updateDocComment,
  listCommentAll,
  // deletePostFirebase,
  // deleteCommentFirebase,
  // onGetPosts
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
                  newComment: 'Felicidades quedo hermoso',
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

// CREAR UN DOCUMENTO DE DATOS POR POST
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

describe('Función que permite modificar comentario', () => {
  it('Debería ser una función', () => {
    expect(typeof updateDocComment).toBe('function');
  });
  it('Debería modificar comentario', (done) => updateDocPost('id_001', 'cid_001', { newComment: 'Felicidades' })
    .then(() => listCommentAll('id_001', (data) => {
      console.log(data);
      const result = data.find((comment) => comment.newComment === 'Felicidades');
      expect(result.newComment).toBe('Felicidades');
      done();
    })));
});
