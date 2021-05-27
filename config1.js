import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyBSh1sWxuywbe2ncMyuHJRlzV9i4gRLo2k",
    authDomain: "petinfo-1bb9d.firebaseapp.com",
    databaseURL:"https://petinfo-1bb9d.firrebaseio.com",
    projectId: "petinfo-1bb9d",
    storageBucket: "petinfo-1bb9d.appspot.com",
    messagingSenderId: "118156563916",
    appId: "1:118156563916:web:62ebdc816e85e72407b969"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();