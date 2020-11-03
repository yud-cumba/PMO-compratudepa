import firebase from '../keys/firebaseConfig';

export const userAdd = (data, id) => {
  firebase.database().ref(`USERS/${id}`).set({
    ...data,
  });
};

export const userUpdate = (data, id) => {
  firebase.database().ref(`USERS/${id}`).child(data.id).update({
    ...data,
  });
};
