import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyDkvVsSUyFaookIQ8KmoaGYU5h2bFq-pVE",
  authDomain: "swot-cloud.firebaseapp.com",
  databaseURL: "https://swot-cloud.firebaseio.com",
  projectId: "swot-cloud",
  storageBucket: "swot-cloud.appspot.com",
  messagingSenderId: "125715456516"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;

