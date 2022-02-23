var admin = require("firebase-admin");
// must be listed before other Firebase SDKs
// Add the Firebase products that you want to use
require("firebase/auth");

var serviceAccount = require("./ezlinks-1b7b7-firebase-adminsdk-a4u13-8316ed2199.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ezlinks-1b7b7.firebaseio.com"
});

var firebaseConfig = {
    apiKey: "AIzaSyBMMo5BxMgQIJxf7uEfISWJm06cDrJHruE",
    authDomain: "ezlinks-1b7b7.firebaseapp.com",
    projectId: "ezlinks-1b7b7",
    storageBucket: "ezlinks-1b7b7.appspot.com",
    messagingSenderId: "68159852275",
    appId: "1:68159852275:web:53dbce4e53b628c9d9b186",
    measurementId: "G-F0RYWJM6DQ"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

module.exports = {
    admin: admin,
    login: (username, password, func) => {
        // All future sign-in request now include tenant ID.
        firebase.auth().signInWithEmailAndPassword(username, password)
        .then(function(result) {
            func(result)
            // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
        }).catch(function(error) {
            // Handle error.
            func(undefined, error)
            console.log(error)
        });
    },

    signup: (email, password) => {
        console.log(email,password)
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(result) {
            func(result)
            // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
        }).catch(function(error) {
            // Handle error.
            func(undefined, error)
            console.log(error)
        });
    }
}