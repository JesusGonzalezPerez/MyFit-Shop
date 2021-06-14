import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaBXZtEk6yb9CcbMwaG2rO4sW8uCO6rEo",
  authDomain: "myfit-32307.firebaseapp.com",
  projectId: "myfit-32307",
  storageBucket: "myfit-32307.appspot.com",
  messagingSenderId: "251933764116",
  appId: "1:251933764116:web:430766e7e7e29f99aed501",
  measurementId: "G-X0DEZSNH8E"
};

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })

export default{
  auth: firebase.auth()
}
