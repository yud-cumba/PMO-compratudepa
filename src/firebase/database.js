import firebase from '../keys/firebaseConfig';

export const userAdd = (id, name, email, role, phone, photo) => {
  firebase.database().ref(`USERS/${id}`).set({
    name,
    email,
    role,
    ...(!!phone && { phone }),
    ...(!!photo && { photo }),
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
export const userFirstTime = (UID, name, email, role, phone, photo) => {
  getUserByUid(UID)
    .catch(() => {
      userAdd(UID, name, email, role, phone, photo);
    });
};

export const getFavoritesByUserId = (UID) => firebase
  .database()
  .ref(`USERS/${UID}/favorites`)
  .once('value')
  .then((value) => new Promise((res, rej) => {
    if (value.val()) {
      res(Object.values(value.val()));
    } else {
      rej(new Error('Aún no hay ningún favorito en tu lista'));
    }
  }));

export const getRatingsByUserId = (UID) => firebase
  .database()
  .ref(`USERS/${UID}/ratings`)
  .once('value')
  .then((value) => new Promise((res, rej) => {
    if (value.val()) {
      res(Object.values(value.val()));
    } else {
      rej(new Error('Aún no calificaste ningún proyecto'));
    }
  }));

export const userAddRating = (userid, data, projectID) => firebase.database().ref(`USERS/${userid}/ratings`).push({
  [projectID]: data,
});

export const userRatingUpdate = (userId, rating, ratingID, projectID) => {
  firebase.database().ref(`USERS/${userId}/ratings`).child(ratingID).update({
    [projectID]: rating,
  });
};

export const userAddFavorite = (userid, data) => firebase.database().ref(`USERS/${userid}/favorites`).push({
  ...data,
});

export const userRemoveFavoriteById = (userid, favoriteID) => firebase.database().ref(`USERS/${userid}/favorites/${favoriteID}`).remove();

export const userUpdate = (data, id) => {
  firebase.database().ref(`USERS/${id}`).child(data.id).update({
    ...data,
  });
};
