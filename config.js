import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyDtFSzJzIVAs9MpVgiviC7ucQx8G2ZsoBM",
  authDomain: "petinfo-c0b4f.firebaseapp.com",
  databaseURL:"https://petinfo-c0b4f.firrebaseio.com",
  projectId: "petinfo-c0b4f",
  storageBucket: "petinfo-c0b4f.appspot.com",
  messagingSenderId: "61895789038",
  appId: "1:61895789038:web:422e56060e6ff75b5ce6ff"
};

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();