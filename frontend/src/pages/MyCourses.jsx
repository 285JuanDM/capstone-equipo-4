import React, { useEffect, useState } from 'react';
import { getUserEnrollments } from '../services/enrollmentService';
import { getCoursesByIds } from '../services/coursesService';
import { useAuth } from '../contexts/AuthContext.jsx';
import CourseCard from '../components/CourseCard';
import '../styles/MyCourses.css';

export default function MyCourses() {
  const { user } = useAuth(); // Hook para obtener el usuario del contexto
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Nos aseguramos de que el objeto user y su email existan
    if (!user || !user.email) {
      setLoading(false);
      // No establecemos un error aquí, simplemente no se cargarán cursos si no hay usuario
      return;
    }

    async function fetchMyCourses() {
      try {
        setLoading(true);
        
        // Usamos el email del usuario logueado dinámicamente
        const enrollments = await getUserEnrollments(user.email);
        if (enrollments.length === 0) {
          setCourses([]);
          setLoading(false);
          return;
        }

        const courseIds = enrollments.map(e => e.courseId);
        const fetchedCourses = await getCoursesByIds(courseIds);

        // Añadir la propiedad isEnrolled a cada curso
        const coursesWithEnrollment = fetchedCourses.map(course => ({
          ...course,
          isEnrolled: true,
        }));

        setCourses(coursesWithEnrollment);
        setError(null);

      } catch (err) {
        console.error("Error al cargar mis cursos:", err);
        setError("No se pudieron cargar tus cursos. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    }

    fetchMyCourses();
  }, [user]); // El efecto se ejecuta cuando el objeto user cambia

  return (
    <div className="my-courses-container">
      <h1>Mis Cursos</h1>
      <p>Aquí encontrarás todos los cursos en los que te has inscrito.</p>

      {loading && <p>Cargando tus cursos...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && courses.length > 0 && (
        <div className="courses-grid">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      {!loading && !error && courses.length === 0 && (
        <div className="no-courses-message">
          <h2>¡Aún no te has inscrito en ningún curso!</h2>
          <p>Explora nuestro catálogo y empieza a aprender hoy mismo.</p>
        </div>
      )}
    </div>
  );
}
