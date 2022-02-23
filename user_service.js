const firebase = require("firebase/app");
require("firebase/auth");

const apiKey = "AIzaSyBMMo5BxMgQIJxf7uEfISWJm06cDrJHruE";
const fb = firebase.initializeApp({
  apiKey: apiKey,
});

exports.addUser = (email, password) =>{
    console.log(email,password)
    fb.auth().createUserWithEmailAndPassword(email, password);
}

exports.authenticate = (email, password) =>
  fb.auth().signInWithEmailAndPassword(email, password);