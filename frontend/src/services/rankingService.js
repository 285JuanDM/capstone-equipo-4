import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import { db } from "../utils/firebase";

function getNameFromEmail(email) {
    if (!email || !email.includes('@')) {
        return "Usuario Anónimo";
    }
    const namePart = email.split('@')[0];
    const words = namePart.replace(/[._-]/g, ' ').split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
}

/**
 * Obtiene los datos del ranking de estudiantes, ordenados por puntos.
 */
export async function getRankingData() {
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, orderBy("points", "desc"), limit(100));

  try {
    console.log("RANKING_SERVICE: Intentando obtener datos del ranking...");
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn("RANKING_SERVICE: La consulta no devolvió documentos. La colección 'users' podría estar vacía o los usuarios no tienen el campo 'points'.");
      return []; // Devuelve un array vacío si no hay datos
    }

    console.log(`RANKING_SERVICE: Se encontraron ${querySnapshot.size} usuarios.`);

    const rankingData = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const name = getNameFromEmail(doc.id);
      const points = data.points || 0;
      console.log(`RANKING_SERVICE: Procesando usuario: ${name}, Puntos: ${points}`);
      return {
        id: doc.id,
        name: name,
        points: points,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
      };
    });

    console.log("RANKING_SERVICE: Datos finales del ranking:", rankingData);
    return rankingData;

  } catch (error) {
    console.error("Error al obtener los datos del ranking:", error);
    if (error.code === 'permission-denied') {
      console.error("RANKING_SERVICE: Error de permisos de Firebase. Revisa las reglas de seguridad de Firestore para la colección 'users'.");
    }
    throw new Error("No se pudo obtener el ranking.");
  }
}
