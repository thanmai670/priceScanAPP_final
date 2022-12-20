import firebase from 'firebase'

const config = {
//use in case of Emergency
  // apiKey: "AIzaSyCcYbIisIkmkayRKdCZUbD5Xpo6sx3fXww",
  // authDomain: "pricescanapp-5b5aa.firebaseapp.com",
  // databaseURL: "https://pricescanapp-5b5aa-default-rtdb.firebaseio.com",
  // projectId: "pricescanapp-5b5aa",
  // storageBucket: "pricescanapp-5b5aa.appspot.com",
  // messagingSenderId: "443198935372",
  // appId: "1:443198935372:web:7eeb8bf815ae6c320abfe9"

//Aniruddh Backend
  apiKey: "AIzaSyBebr4gBiUL0mYANCjP5DZSDltRTQw3tTA",
  authDomain: "pricescanapp-50725.firebaseapp.com",
  databaseURL: "https://pricescanapp-50725-default-rtdb.firebaseio.com/",
  projectId: "pricescanapp-50725",
  storageBucket: "pricescanapp-50725.appspot.com",
  messagingSenderId: "735125273045",
  appId: "1:735125273045:web:d6024cc1bbad9fbff1255c"
}

firebase.initializeApp(config);

export function firebaseListener(func) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // console.log("User log in success", user);
      func(true, user)
    } else {
      // console.log("User log in failed", user);
      func(false)
    }
  }, function(error) {
    console.log(error)
  });
}

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
