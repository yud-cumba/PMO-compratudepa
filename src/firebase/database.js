import firebase from '../keys/firebaseConfig';

export const userAdd = (data, id) => {
  firebase.database().ref(`USERS/${id}`).set({
    ...data,
  });
};

export const getUserByUid = (UID) => firebase
  .database()
  .ref(`USERS/${UID}`)
  .once('value')
  .then((value) => new Promise((res, rej) => {
    if (value.val()) {
      res(value.val());
    } else {
      rej(new Error(`No hay usuario con el id ${UID}`));
    }
  }));

export const userAddFavorite = (userid, data) => firebase.database().ref(`USERS/${userid}/favorites`).push({
  ...data,
});

export const userRemoveFavoriteById = (userid, favoriteID) => firebase.database().ref(`USERS/${userid}/favorites/${favoriteID}`).remove();

export const userUpdate = (data, id) => {
  firebase.database().ref(`USERS/${id}`).child(data.id).update({
    ...data,
  });
};
