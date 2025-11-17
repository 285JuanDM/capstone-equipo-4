import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { awardBadgeForCourse } from "./badgeService";
import { awardPointsForLesson } from "./gamificationService";
import { getCourseLessons } from "./lessonService";

/**
 * Obtiene el progreso de todos los cursos en los que un usuario está inscrito.
 */
export async function getUserProgress(userId) {
  const enrollmentsCollection = collection(db, "enrollments");
  const q = query(enrollmentsCollection, where("userId", "==", userId));

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
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
          return null;
        }
      })
    );

    return progressData.filter((p) => p !== null);
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
    const enrollmentData = enrollmentDoc.data();

    if (enrollmentData.completedLessons && enrollmentData.completedLessons.includes(lessonId)) {
      console.log("La lección ya ha sido completada anteriormente.");
      return { status: "success", progress: enrollmentData.progress || 0 };
    }

    await updateDoc(enrollmentRef, {
      completedLessons: arrayUnion(lessonId),
    });

    await awardPointsForLesson(userId);

    const allLessons = await getCourseLessons(courseId);
    const updatedEnrollmentSnap = await getDoc(enrollmentRef);
    const completedLessons = updatedEnrollmentSnap.data().completedLessons || [];

    const totalLessons = allLessons.length;
    const completedCount = completedLessons.length;

    const newProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 100;

    await updateDoc(enrollmentRef, {
      progress: newProgress,
    });

    console.log(`Progreso actualizado para el curso ${courseId}: ${newProgress}%`);

    // Si el progreso llega al 100%, otorga una insignia.
    if (newProgress === 100) {
      try {
        const courseRef = doc(db, "courses", courseId);
        const courseSnap = await getDoc(courseRef);
        if (courseSnap.exists()) {
          const courseTitle = courseSnap.data().title;
          await awardBadgeForCourse(userId, courseId, courseTitle);
        }
      } catch (badgeError) {
        console.error("Error al intentar otorgar la insignia:", badgeError);
      }
    }

    return {
      status: "success",
      progress: newProgress,
    };
  } catch (error) {
    console.error("Error al marcar la lección como completada:", error);
    return { status: "error", message: error.message };
  }
}
