import firebase from "firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyB46Mwg0lYMJ4BPeCPI0YHSEZcUw4gCL74",
  authDomain: "tic-tac-toe-90fde.firebaseapp.com",
  projectId: "tic-tac-toe-90fde",
  storageBucket: "tic-tac-toe-90fde.appspot.com",
  messagingSenderId: "233177048347",
  appId: "1:233177048347:web:7011c493f11eee6b0b9fbe",
  measurementId: "G-ELV1LSX31C",
};

export const apiUrl =
  "https://us-central1-tic-tac-toe-90fde.cloudfunctions.net/";
// "http://localhost:5001/tic-tac-toe-90fde/us-central1/";

export const generateToken = async () => {
  const user = firebase.auth().currentUser;
  if (user) {
    return await user.getIdToken().then((idToken) => {
      return idToken;
    });
  } else {
    console.error("User has not sign-in");
    return null;
  }
};
