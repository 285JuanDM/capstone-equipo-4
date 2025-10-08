import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

export async function getCourses() {
  const snapshot = await getDocs(collection(db, "courses"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}
