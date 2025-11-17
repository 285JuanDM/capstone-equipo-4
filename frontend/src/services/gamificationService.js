import { doc, setDoc, increment } from "firebase/firestore";
import { db } from "../utils/firebase";

const POINTS_PER_LESSON = 10;

/**
 * Otorga puntos a un usuario por completar una acción, como una lección.
 * Crea o actualiza el documento del usuario para asegurar que los puntos se añadan.
 * @param {string} userId - El ID del usuario (su email) que recibirá los puntos.
 * @returns {Promise<void>}
 */
export async function awardPointsForLesson(userId) {
  // El ID del documento del usuario en la colección 'users' es su email.
  const userRef = doc(db, "users", userId);

  try {
    // setDoc con { merge: true } es la clave.
    // 1. Si el documento 'user' no existe, lo crea.
    // 2. Si existe pero no tiene el campo 'points', lo añade.
    // 3. Si el campo 'points' ya existe, lo incrementa.
    await setDoc(userRef, {
      points: increment(POINTS_PER_LESSON)
    }, { merge: true });

    console.log(`GAMIFICATION_SERVICE: Puntos actualizados correctamente para el usuario ${userId}.`);

  } catch (error) {
    console.error(`Error al otorgar puntos al usuario ${userId}:`, error);
    // Aquí se podría añadir un sistema de reintentos o un log de errores más avanzado.
  }
}
