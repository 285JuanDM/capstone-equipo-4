
import { collection, doc, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase.js';

// --- Configuración ---
// Usamos la ID correcta que nos proporcionaste.
const CURSE_ID = "YybsFyS5eoCpVbkxFF4M"; 

// --- Datos de las lecciones ---
const lessonsData = [
  {
    title: "Introducción a la IA Generativa",
    contentType: "video",
    duration: 12,
    order: 1,
  },
  {
    title: "Lectura: El Futuro de los Prompts",
    contentType: "text",
    duration: 8,
    order: 2,
  },
  {
    title: "Taller Práctico: Creando tu Primer Agente",
    contentType: "video",
    duration: 25,
    order: 3,
  }
];

// --- Función para añadir las lecciones ---
async function seedLessons() {
  console.log(`Iniciando el proceso de siembra para el curso: ${CURSE_ID}`);

  if (!CURSE_ID) {
    console.error("Error: La ID del curso no está especificada.");
    return;
  }

  const lessonsCollection = collection(db, 'lessons');
  const courseRef = doc(db, 'courses', CURSE_ID);

  try {
    for (const lesson of lessonsData) {
      const lessonPayload = {
        ...lesson,
        courseRef: courseRef, // Vinculamos la lección al curso correcto
      };
      
      const docRef = await addDoc(lessonsCollection, lessonPayload);
      console.log(`  -> Lección '${lesson.title}' creada con éxito (ID: ${docRef.id})`);
    }
    console.log("\n¡Siembra completada! Se han añadido ${lessonsData.length} lecciones a la base de datos.");
  } catch (error) {
    console.error("Error durante el proceso de siembra:", error);
  }
}

seedLessons();
