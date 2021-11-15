// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDFgrUWFonyW1KUANCUyuBI8G_RhgyZO6g',
  authDomain: 'my-doctor-01-9894c.firebaseapp.com',
  databaseURL:
    'https://my-doctor-01-9894c-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'my-doctor-01-9894c',
  storageBucket: 'my-doctor-01-9894c.appspot.com',
  messagingSenderId: '915505680008',
  appId: '1:915505680008:web:f7ab886c8ebcb7c88b993d',
};

// Initialize Firebase
const Fire = initializeApp(firebaseConfig);

export default Fire;
