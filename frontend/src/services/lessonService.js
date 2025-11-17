import { collection, query, where, getDocs, orderBy, doc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const lessonsCollection = collection(db, 'lessons');

/**
 * Obtiene todas las lecciones de un curso específico, ordenadas por el campo 'order'.
 * @param {string} courseId - El ID del curso.
 * @returns {Promise<Array>} - Una promesa que se resuelve con un array de lecciones.
 */
export async function getCourseLessons(courseId) {
  if (!courseId) {
    throw new Error('El ID del curso es obligatorio para obtener las lecciones.');
  }

  try {
    // Creamos una referencia de documento real, que es el tipo de dato correcto
    const courseDocRef = doc(db, 'courses', courseId);

    // Hacemos la consulta para obtener las lecciones, comparando la referencia del documento
    const q = query(
      lessonsCollection,
      where('courseRef', '==', courseDocRef), // La comparación ahora es correcta
      orderBy('order', 'asc')
    );

    const querySnapshot = await getDocs(q);

    const lessons = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return lessons;
  } catch (error) {
    console.error('Error al obtener las lecciones del curso:', error);
    throw new Error('No se pudieron cargar las lecciones.');
  }
}
