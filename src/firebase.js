import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJRMycq5aDIKpgPSr__EfnzRgln7T7SG0",
  authDomain: "waitlist-33a5c.firebaseapp.com",
  projectId: "waitlist-33a5c",
  storageBucket: "waitlist-33a5c.appspot.com",
  messagingSenderId: "781951739408",
  appId: "1:781951739408:web:d0fd008b99acfcc0054c95"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
