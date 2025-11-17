import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, doc } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const courseTitle = "Fundamentos de programación";

// Nueva lección de vídeo
const lessonToAdd = {
  title: "Qué es un lenguaje de programación",
  contentType: 'video',
  url: '/lessons/videos/video2.mp4',
  order: 3, 
  duration: 10, // Duración estimada
};

async function createLesson() {
  console.log(`Iniciando la creación de la lección para el curso "${courseTitle}"...`);

  try {
    const coursesRef = collection(db, 'courses');
    const q = query(coursesRef, where("title", "==", courseTitle));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error(`Error: No se encontró el curso con el título "${courseTitle}".`);
      return;
    }

    const courseDoc = querySnapshot.docs[0];
    const courseId = courseDoc.id;
    const courseRef = doc(db, 'courses', courseId);
    console.log(`  -> Curso "${courseTitle}" encontrado con ID: ${courseId}`);

    const lessonData = {
      ...lessonToAdd,
      courseRef: courseRef,
    };

    const lessonsCollection = collection(db, 'lessons');
    const docRef = await addDoc(lessonsCollection, lessonData);
    console.log(`  -> Lección '${lessonData.title}' creada con éxito (ID: ${docRef.id})`);

    console.log(`\n¡Proceso completado!`);

  } catch (error) {
    console.error("Error durante el proceso de creación de la lección:", error);
  }
}

createLesson();
