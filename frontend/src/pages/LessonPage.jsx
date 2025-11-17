import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { markLessonAsCompleted } from '../services/progressService';
import { useAuth } from '../contexts/AuthContext.jsx'; // Importar el hook de autenticación

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Obtener el usuario del contexto
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Asegurarse de que el usuario está cargado antes de hacer nada
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchLesson = async () => {
      try {
        setLoading(true);
        const lessonRef = doc(db, 'lessons', lessonId);
        const lessonSnap = await getDoc(lessonRef);

        if (lessonSnap.exists()) {
          setLessonData(lessonSnap.data());
          // Usar el email del usuario logueado para marcar la lección como completada
          await markLessonAsCompleted(user.email, courseId, lessonId);
        } else {
          console.error('No se encontró la lección.');
        }
      } catch (error) {
        console.error('Error al cargar la lección:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [courseId, lessonId, user]); // Añadir user a las dependencias

  if (loading) {
    return <p>Cargando lección...</p>;
  }

  if (!lessonData) {
    return <p>Lección no encontrada.</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate(`/courses/${courseId}`)}>Volver al curso</button>
      <h1>{lessonData.title}</h1>
      <p>{lessonData.description}</p>
      {/* Aquí se renderizaría el contenido específico de la lección (video, texto, etc.) */}
    </div>
  );
}
