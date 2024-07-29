import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-XoJuJ8NjN3EUSwHO6KdmKw6ShJySeUg",
  authDomain: "pantry-track.firebaseapp.com",
  projectId: "pantry-track",
  storageBucket: "pantry-track.appspot.com",
  messagingSenderId: "894667218839",
  appId: "1:894667218839:web:0778a13db8acc33df2eed2",
  measurementId: "G-007BN9XB9M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let analytics;
(async () => {
  if (typeof window !== "undefined") {
    const isFirebaseAnalyticsSupported = await isSupported();
    if (isFirebaseAnalyticsSupported) {
      analytics = getAnalytics(app);
    }
  }
})();

export { analytics, db };
