import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const enrollmentCollection = collection(db, "enrollments");

// Inscribe a un usuario en un curso
export async function enrollInCourse(userId, courseId) {
  try {
    // Opcional: Verificar si ya existe una inscripción para evitar duplicados
    const q = query(
      enrollmentCollection,
      where("userId", "==", userId),
      where("courseId", "==", courseId)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log("El usuario ya está inscrito en este curso.");
      return { status: "already_enrolled" };
    }

    // Si no está inscrito, crea la nueva inscripción
    const docRef = await addDoc(enrollmentCollection, {
      userId: userId,
      courseId: courseId,
      enrolledAt: serverTimestamp(),
      progress: 0, // Opcional: para seguir el progreso
    });
    console.log("Inscripción exitosa con ID: ", docRef.id);
    return { status: "success", docId: docRef.id };
  } catch (error) {
    console.error("Error al inscribir en el curso: ", error);
    throw new Error("No se pudo completar la inscripción.");
  }
}

// Obtiene los cursos en los que un usuario está inscrito
export async function getUserEnrollments(userId) {
  const q = query(enrollmentCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  
  const enrollments = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return enrollments;
}
