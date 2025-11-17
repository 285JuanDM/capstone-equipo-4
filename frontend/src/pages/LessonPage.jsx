import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { markLessonAsCompleted } from '../services/progressService';
import { useAuth } from '../contexts/AuthContext.jsx';
import PdfViewer from '../components/PdfViewer';
import VideoPlayer from '../components/VideoPlayer'; // Importar VideoPlayer

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          const data = lessonSnap.data();
          setLessonData(data);
          
          if (data.courseRef && data.courseRef.id === courseId) {
            await markLessonAsCompleted(user.email, courseId, lessonId);
          } else {
            console.warn('La lección no parece corresponder al curso actual.');
          }
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
  }, [courseId, lessonId, user]);

  const renderLessonContent = () => {
    if (!lessonData) return null;

    switch (lessonData.contentType) {
      case 'pdf':
        return <PdfViewer url={lessonData.url} />;
      
      case 'video':
        // Mostrar el reproductor de vídeo directamente
        return <VideoPlayer url={lessonData.url} />;

      case 'text':
        return <div dangerouslySetInnerHTML={{ __html: lessonData.content }} />;

      default:
        return <p>Este tipo de contenido aún no es soportado o no se ha definido.</p>;
    }
  };

  if (loading) {
    return <p>Cargando lección...</p>;
  }

  if (!lessonData) {
    return <p>Lección no encontrada.</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate(-1)}>Volver al curso</button>
      <h1>{lessonData.title}</h1>
      
      <section className="lesson-content-container" style={{ marginTop: '2rem' }}>
        {renderLessonContent()} 
      </section>
    </div>
  );
}
