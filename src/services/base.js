import firebase from 'firebase/app'

var config = {
  apiKey: 'API-KEY',
  authDomain: 'PROJECT-ID.firebaseapp.com',
  projectId: 'PROJECT-ID'
}

// Get a Firestore instance
export const service = firebase
  .initializeApp(config)
