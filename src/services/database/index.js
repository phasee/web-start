import firebase from 'firebase/app'
import { service } from '@/services/base'
import 'firebase/firestore'

// Get a Firestore instance
export const db = service.firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint, FieldValue } = firebase.firestore
export { TimeStamp, GeoPoint, FieldValue }
