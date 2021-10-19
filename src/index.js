import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app'
import 'react-quill/dist/quill.snow.css'; // ES6

//const firebase = require('firebase');
require('firebase/firestore');


firebase.initializeApp({
  apiKey: "AIzaSyAcIT-2pWEP6Q-BID0bMWaJ7kUh_zZbGko",
  authDomain: "memoapp-700b2.firebaseapp.com",
  projectId: "memoapp-700b2",
  storageBucket: "memoapp-700b2.appspot.com",
  messagingSenderId: "483474774053",
  appId: "1:483474774053:web:fded7660a55a21b16c87cc",
  measurementId: "G-T0KRZEXWE8"
});


ReactDOM.render(<App />, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
