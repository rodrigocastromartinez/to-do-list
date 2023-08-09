// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVgEfP6I-9BpIY09vckC2_2siVsOY4kj0",
  authDomain: "skrach-ee29c.firebaseapp.com",
  projectId: "skrach-ee29c",
  storageBucket: "skrach-ee29c.appspot.com",
  messagingSenderId: "465522830113",
  appId: "1:465522830113:web:edb403aedc09f31ed9ec60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export default storage