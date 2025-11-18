import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Back } from '../assets/AppIcons.jsx';
import { Loading } from '../components/Loading.jsx';
import PdfViewer from '../components/PdfViewer';
import VideoPlayer from '../components/VideoPlayer'; // Importar VideoPlayer
import { useAuth } from '../contexts/AuthContext.jsx';
import { markLessonAsCompleted } from '../services/progressService';
import '../styles/LessonPage.css';
import { db } from '../utils/firebase';

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
    return <Loading />;
  }

  if (!lessonData) {
    return <p>Lección no encontrada.</p>;
  }

  return (
    <div>
      <a className="lesson-back-btn" onClick={() => navigate(-1)}>
        <Back /> Volver
      </a>

      <h1>{lessonData.title}</h1>
      
      <section className="lesson-content-container" style={{ marginTop: '2rem' }}>
        {renderLessonContent()}
      </section>
    </div>
  );
}
