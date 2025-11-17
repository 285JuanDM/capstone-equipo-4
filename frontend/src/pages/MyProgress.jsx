import { useEffect, useState } from 'react';
import { getUserProgress } from '../services/progressService';
import { useAuth } from '../contexts/AuthContext.jsx';
import '../styles/MyProgress.css'; // Crearemos este archivo para los estilos

export default function MyProgress() {
  const { user } = useAuth(); // Hook para obtener el usuario del contexto
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Asegurarse de que el objeto user y su email existan
    if (!user || !user.email) {
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        setLoading(true);
        // Usar el email del usuario logueado dinámicamente
        const userProgress = await getUserProgress(user.email);
        setProgress(userProgress);
      } catch (error) {
        console.error('Error al obtener el progreso:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user]); // El efecto se ejecuta cuando el objeto user cambia

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
