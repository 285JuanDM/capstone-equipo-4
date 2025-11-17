import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// --- Configuración ---
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const courseTitle = "Fundamentos de programación";
// ¡CORRECCIÓN DEFINITIVA! Usando la ruta proporcionada por el usuario.
const localVideoPath = 'public/lessons/videos/video1.mp4'; 

const lessonDetails = {
  title: "Vídeo: ¿Qué es una variable? (Storage)",
  contentType: 'video',
  order: 2,
  duration: 8,
};
// ---------------------

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

async function uploadVideoAndCreateLesson() {
  console.log("Iniciando proceso...");

  try {
    // 1. LEER EL ARCHIVO LOCAL
    console.log(`  -> Leyendo archivo desde: ${localVideoPath}`);
    const videoBuffer = fs.readFileSync(localVideoPath);
    const videoFileName = path.basename(localVideoPath);

    // 2. SUBIR EL ARCHIVO A FIREBASE STORAGE
    console.log(`  -> Subiendo "${videoFileName}" a Firebase Storage...`);
    const storageRef = ref(storage, `lessons/videos/${Date.now()}_${videoFileName}`);
    const snapshot = await uploadBytes(storageRef, videoBuffer, {
      contentType: 'video/mp4',
    });
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(`  -> ¡Subida completada! URL de descarga: ${downloadURL}`);

    // 3. ENCONTRAR EL CURSO
    console.log(`  -> Buscando el curso "${courseTitle}"...`);
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
    console.log(`  -> Curso encontrado con ID: ${courseId}`);

    // 4. CREAR LA LECCIÓN EN FIRESTORE
    console.log(`  -> Creando la lección "${lessonDetails.title}" en Firestore...`);
    const lessonData = {
      ...lessonDetails,
      url: downloadURL, // Usamos la URL de Firebase Storage
      courseRef: courseRef,
    };
    const docRef = await addDoc(collection(db, 'lessons'), lessonData);
    console.log(`  -> ¡Lección creada con éxito! ID: ${docRef.id}`);

    console.log("\n¡Proceso completado con éxito!");

  } catch (error) {
    console.error("\nError durante el proceso:", error);
    if (error.code === 'ENOENT') {
      console.error(`  -> AYUDA: No se pudo encontrar el archivo en la ruta "${localVideoPath}". Verifica que el archivo exista en esa ubicación.`);
    }
  }
}

uploadVideoAndCreateLesson();
