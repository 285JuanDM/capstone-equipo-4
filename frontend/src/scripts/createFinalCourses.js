
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import dotenv from 'dotenv';

// 1. Cargar las variables de entorno del archivo .env
dotenv.config();

// 2. Configurar Firebase para el entorno de Node.js
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

// Inicializar la app de Firebase y obtener la instancia de Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Definición de los Cursos Finales ---

const coursesToCreate = [
  {
    category: "Programación",
    createdBy: "Julian",
    description: "Bienvenido al mundo de la programación",
    level: "Inicial",
    published: true,
    title: "Fundamentos de programación",
  },
];

// --- Lógica para Añadir los Cursos a Firestore ---

const coursesCollection = collection(db, 'courses');

async function createCourses() {
  console.log("Iniciando la creación de cursos finales...");

  try {
    for (const courseData of coursesToCreate) {
      const docRef = await addDoc(coursesCollection, courseData);
      console.log(`  -> Curso '${courseData.title}' creado con éxito (ID: ${docRef.id})`);
    }
    console.log(`
¡Proceso completado! Se han creado ${coursesToCreate.length} cursos.`);
  } catch (error) {
    console.error("Error durante el proceso de creación de cursos:", error);
  }
}

createCourses();
