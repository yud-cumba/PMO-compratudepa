import firebase from '../keys/firebaseConfig';

export const addFileToStorage = (refPath, files) => new Promise((res) => {
  files.forEach((file) => {
    firebase.storage().ref(`${refPath}/${file.name}`).put(file)
      .then(() => res(files.map((f) => f.name)));
  });
});

export const getFileFromStorage = (path) => firebase.storage().ref().child(path).getDownloadURL();
