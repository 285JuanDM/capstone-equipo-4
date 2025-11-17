import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";

// Obtiene todos los cursos
export async function getCourses() {
  const snapshot = await getDocs(collection(db, "courses"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Obtiene cursos específicos a partir de una lista de IDs
export async function getCoursesByIds(courseIds) {
  if (!courseIds || courseIds.length === 0) {
    return [];
  }

  const coursesRef = collection(db, "courses");
  const q = query(coursesRef, where("__name__", "in", courseIds));
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}
