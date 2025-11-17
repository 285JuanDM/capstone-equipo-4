import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

/**
 * Otorga una insignia a un usuario por completar un curso, 
 * evitando duplicados.
 * @param {string} userId - El ID del usuario.
 * @param {string} courseId - El ID del curso completado.
 * @param {string} courseTitle - El título del curso para la insignia.
 * @returns {Promise<void>}
 */
export async function awardBadgeForCourse(userId, courseId, courseTitle) {
  const badgesCollection = collection(db, "user_badges");

  // 1. Verificar si ya existe una insignia para este usuario y curso
  const q = query(
    badgesCollection,
    where("userId", "==", userId),
    where("courseId", "==", courseId)
  );

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      console.log(`El usuario ya tiene la insignia para el curso ${courseId}. No se tomarán acciones.`);
      return; // Si ya tiene la insignia, no se hace nada
    }

    // 2. Si no existe, otorgar la nueva insignia
    await addDoc(badgesCollection, {
      userId,
      courseId,
      badgeName: `Maestro de ${courseTitle}`,
      imageUrl: "https://www.flaticon.com/svg/static/icons/svg/3135/3135722.svg", // URL de insignia genérica
      awardedAt: new Date(),
    });

    console.log(`¡Insignia otorgada al usuario ${userId} por completar el curso ${courseTitle}!`);

  } catch (error) {
    console.error("Error al otorgar la insignia:", error);
    throw new Error("No se pudo otorgar la insignia.");
  }
}
