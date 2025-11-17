import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { markLessonAsCompleted } from '../services/progressService';

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Hardcoded userId
  const userId = "julian.d.alvarado23@gmail.com";

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonRef = doc(db, 'lessons', lessonId);
        const lessonSnap = await getDoc(lessonRef);

        if (lessonSnap.exists()) {
          setLessonData(lessonSnap.data());
          // Marcar la lección como completada al cargar la página
          await markLessonAsCompleted(userId, courseId, lessonId);
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
  }, [courseId, lessonId, userId]);

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
