import { useEffect, useState } from 'react';
import { getUserProgress } from '../services/progressService';
import '../styles/MyProgress.css'; // Crearemos este archivo para los estilos

export default function MyProgress() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded userId
  const userId = "julian.d.alvarado23@gmail.com";

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const userProgress = await getUserProgress(userId);
        setProgress(userProgress);
      } catch (error) {
        console.error('Error al obtener el progreso:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [userId]);

  if (loading) {
    return <p>Cargando tu progreso...</p>;
  }

  return (
    <div className="my-progress-container">
      <h1>Mi Progreso</h1>
      {progress.length > 0 ? (
        <div className="progress-list">
          {progress.map(course => (
            <div key={course.courseId} className="course-progress-card">
              <img src={course.imageUrl} alt={course.title} className="course-image" />
              <div className="course-info">
                <h3>{course.title}</h3>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p>{course.progress}% completado</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Aún no te has inscrito en ningún curso. ¡Explora nuestros cursos y empieza a aprender!</p>
      )}
    </div>
  );
}
