import firebase from 'firebase/app'

var config = {
  apiKey: 'INSERT-API-KEY',
  authDomain: 'INSERT-PROJECT-ID.firebaseapp.com',
  projectId: 'INSERT-PROJECT-ID'
}

// Get a Firestore instance
export const service = firebase
  .initializeApp(config)
