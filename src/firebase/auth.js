import firebase from '../keys/firebaseConfig';

export const currentUser = () => firebase.auth().currentUser;

export const verifyIsLogin = (isLogin, isNotLogin) => firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    isLogin(user);
  } else {
    isNotLogin();
  }
});

export const registerUserEmail = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

export const verificationEmail = () => firebase.auth().currentUser.sendEmailVerification();

export const logIn = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password);

export const recoverPassword = (email) => firebase.auth().sendPasswordResetEmail(email);

export const logInFacebook = () => firebase.auth()
  .signInWithPopup(new firebase.auth.FacebookAuthProvider());

export const logInGoogle = () => firebase.auth()
  .signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((doc) => doc.user);

export const logout = () => firebase.auth().signOut();

export const updateUserProfile = (userName) => firebase.auth().currentUser.updateProfile({
  displayName: userName,
});
