import MockFirebase from 'mock-cloud-firestore';
import {
  addDocPost,
  listPostAll,
  // updateLike,
  // addDocComment,
  // updateDocPost,
  // updateDocComment,
  // listPostAll,
  // listCommentAll,
  // getPostData,
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
          likes: '1',
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
  it('Debería crear una nueva publicación', (done) => addDocPost('texto en muro', '001', 'Kathy', '', '', '', '1')
    .then(() => listPostAll(
      (data) => {
        // verificar que
        const result = data.find((posts) => posts.newPost === 'texto en muro');
        expect(result.newPost).toBe('texto en muro');
        done(); // ES LA PROMESA QUE LE DICE AL TEST QUE NO SE QUEDE ESPERANDO A LA OTRA PROMESA
      },
    )));
});
