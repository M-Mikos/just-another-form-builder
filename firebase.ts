import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "./config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore realtime database
export const database = getDatabase(app);
