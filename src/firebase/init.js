import firebase from 'firebase'
import firestore from 'firebase/firestore'

const  firebaseConfig = {
  apiKey: "AIzaSyDtofZAchlFmT4f6w2aGdad8kFqT2pL3Uk",
  authDomain: "vue-geo-7d680.firebaseapp.com",
  databaseURL: "https://vue-geo-7d680.firebaseio.com",
  projectId: "vue-geo-7d680",
  storageBucket: "vue-geo-7d680.appspot.com",
  messagingSenderId: "159586078936",
  appId: "1:159586078936:web:6b5990062d629a93eec7ad"
};

const fApp = firebase.initializeApp(firebaseConfig)

export default fApp.firestore();
