import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getUserProgress } from '../services/progressService';
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
    return <Loading />
  }

  return (
    <div className="my-progress-container">
      <h1>Mi Progreso</h1>

      {progress.length > 0 ? (

        <div className="progress-list">
          {progress.map(course => (
            <div key={course.courseId} className="course-progress-card">
              <img src={"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={course.title} className="course-image" />
              <div className="course-info">
                <h3>{course.title}</h3>
                <ProgressBar progress={course.progress} />
              </div>
            </div>
          ))}
        </div>
        
      ) : (
        <div className="no-courses-message">
          <h2>¡Aún no te has inscrito en ningún curso!</h2>
          <p>Explora nuestro catálogo y empieza a aprender hoy mismo.</p>
        </div>
      )}
    </div>
  );
}
