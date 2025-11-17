
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc, // Importar getDoc
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { getCourseLessons } from "./lessonService";

/**
 * Obtiene el progreso de todos los cursos en los que un usuario está inscrito.
 * @param {string} userId - El ID del usuario.
 * @returns {Promise<Array>} - Una promesa que se resuelve con un array de objetos, 
 * donde cada objeto representa un curso y su progreso.
 */
export async function getUserProgress(userId) {
  const enrollmentsCollection = collection(db, "enrollments");
  const q = query(enrollmentsCollection, where("userId", "==", userId));

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("El usuario no está inscrito en ningún curso.");
      return [];
    }

    const progressData = await Promise.all(
      querySnapshot.docs.map(async (enrollmentDoc) => {
        const enrollmentData = enrollmentDoc.data();
        const courseId = enrollmentData.courseId;
        const progress = enrollmentData.progress || 0;

        const courseRef = doc(db, "courses", courseId);
        const courseSnap = await getDoc(courseRef);

        if (courseSnap.exists()) {
          const courseData = courseSnap.data();
          return {
            courseId: courseId,
            title: courseData.title,
            imageUrl: courseData.imageUrl,
            progress: progress,
          };
        } else {
          console.warn(`No se encontró el curso con ID: ${courseId}`);
          return null;
        }
      })
    );

    return progressData.filter(p => p !== null);

  } catch (error) {
    console.error("Error al obtener el progreso del usuario:", error);
    throw new Error("No se pudo obtener el progreso del usuario.");
  }
}

/**
 * Marca una lección como completada para un usuario en un curso específico.
 */
export async function markLessonAsCompleted(userId, courseId, lessonId) {
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

    await updateDoc(enrollmentRef, {
      completedLessons: arrayUnion(lessonId),
    });

    const allLessons = await getCourseLessons(courseId);
    // Se necesita volver a obtener el documento para tener el array actualizado
    const updatedEnrollmentSnap = await getDoc(enrollmentRef);
    const completedLessons = updatedEnrollmentSnap.data().completedLessons || [];
    
    const totalLessons = allLessons.length;
    const completedCount = completedLessons.length;

    if (totalLessons === 0) {
      return { status: "success", progress: 100 }; // Si no hay lecciones, el progreso es 100%
    }
    
    const newProgress = Math.round((completedCount / totalLessons) * 100);

    await updateDoc(enrollmentRef, {
      progress: newProgress,
    });

    console.log(`Progreso actualizado para el curso ${courseId}: ${newProgress}%`);

    return {
      status: "success",
      progress: newProgress,
    };

  } catch (error) {
    console.error("Error al marcar la lección como completada:", error);
    return { status: "error", message: error.message };
  }
}
