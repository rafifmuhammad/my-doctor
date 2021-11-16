// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'your_api_key',
  authDomain: 'your_auth_domain',
  databaseURL:
    'your_database_url',
  projectId: 'your_project_id',
  storageBucket: 'your_storage_bucket',
  messagingSenderId: '',
  appId: 'your_app_id',
};

// Initialize Firebase
const Fire = initializeApp(firebaseConfig);

export default Fire;
