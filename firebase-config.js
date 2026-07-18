// Firebase Config
const firebaseConfig = {
  apiKey: "YAHAN_APNA_API_KEY",
  authDomain: "global-pay-panel.firebaseapp.com",
  projectId: "global-pay-panel",
  storageBucket: "global-pay-panel.firebasestorage.app",
  messagingSenderId: "50490595463",
  appId: "1:50490595463:web:69457a3db6634522b3c022"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Google Auth
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
