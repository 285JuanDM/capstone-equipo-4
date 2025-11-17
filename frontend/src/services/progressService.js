
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { getCourseLessons } from "./lessonService";

/**
 * Marca una lección como completada para un usuario en un curso específico
 * y recalcula el progreso general del curso.
 *
 * @param {string} userId - El ID del usuario.
 * @param {string} courseId - El ID del curso.
 * @param {string} lessonId - El ID de la lección a marcar como completada.
 * @returns {object} Un objeto con el estado de la operación y el progreso actualizado.
 */
export async function markLessonAsCompleted(userId, courseId, lessonId) {
  // 1. Encontrar el documento de inscripción específico.
  const enrollmentCollection = collection(db, "enrollments");
  const q = query(
    enrollmentCollection,
    where("userId", "==", userId),
    where("courseId", "==", courseId)
  );

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No se encontró la inscripción para este usuario y curso.");
    }

    const enrollmentDoc = querySnapshot.docs[0];
    const enrollmentRef = doc(db, "enrollments", enrollmentDoc.id);

    // 2. Añadir la lección al array de lecciones completadas (evitando duplicados).
    await updateDoc(enrollmentRef, {
      completedLessons: arrayUnion(lessonId),
    });

    // 3. Recalcular el progreso.
    const allLessons = await getCourseLessons(courseId);
    const completedLessons = (await getDocs(q)).docs[0].data().completedLessons || [];
    
    const totalLessons = allLessons.length;
    const completedCount = completedLessons.length;

    if (totalLessons === 0) {
      throw new Error("El curso no tiene lecciones para calcular el progreso.");
    }
    
    const newProgress = Math.round((completedCount / totalLessons) * 100);

    // 4. Actualizar el campo de progreso en la inscripción.
    await updateDoc(enrollmentRef, {
      progress: newProgress,
    });

    console.log(`Progreso actualizado para el curso ${courseId}: ${newProgress}%`);

    return {
      status: "success",
      progress: newProgress,
      completedLessons: completedLessons,
    };

  } catch (error) {
    console.error("Error al marcar la lección como completada:", error);
    return { status: "error", message: error.message };
  }
}
