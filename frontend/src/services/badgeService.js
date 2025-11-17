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

  const q = query(
    badgesCollection,
    where("userId", "==", userId),
    where("courseId", "==", courseId)
  );

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      console.log(`El usuario ya tiene la insignia para el curso ${courseId}. No se tomarán acciones.`);
      return;
    }

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

/**
 * Obtiene todas las insignias de un usuario específico.
 * @param {string} userId - El ID del usuario.
 * @returns {Promise<Array>} - Un array con las insignias del usuario.
 */
export async function getUserBadges(userId) {
  const badgesCollection = collection(db, "user_badges");
  const q = query(badgesCollection, where("userId", "==", userId));

  try {
    const querySnapshot = await getDocs(q);
    const badges = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`Se encontraron ${badges.length} insignias para el usuario ${userId}.`);
    return badges;

  } catch (error) {
    console.error("Error al obtener las insignias del usuario:", error);
    throw new Error("No se pudo obtener las insignias.");
  }
}
