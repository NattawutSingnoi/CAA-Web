import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../config";

const app = firebaseConfig();
const db = getFirestore(app);
