import firebase from 'firebase/app'

var config = {
  apiKey: 'AIzaSyD7Y2EY-NC4QOfCy6ZTF2_0wipno20frYk',
  authDomain: 'giggity-86f3b.firebaseapp.com',
  projectId: 'giggity-86f3b'
}

// Get a Firestore instance
export const service = firebase
  .initializeApp(config)
