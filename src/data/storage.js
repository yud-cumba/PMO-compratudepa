/* eslint-disable import/prefer-default-export */
import firebase from 'firebase';

export const addFileToStorage = (refPath, file) => firebase.storage().ref(refPath).put(file);
