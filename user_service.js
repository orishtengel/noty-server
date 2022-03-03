const firebase = require("firebase/app");
require("firebase/auth");

const apiKey = "AIzaSyBMMo5BxMgQIJxf7uEfISWJm06cDrJHruE";
const fb = firebase.initializeApp({
  apiKey: apiKey,
});

module.exports = {
  addUser : (email, password) => {
    fb.auth().createUserWithEmailAndPassword(email, password);
  },

  authenticate:(email, password) => {
      fb.auth().signInWithEmailAndPassword(email, password);
  }
}
