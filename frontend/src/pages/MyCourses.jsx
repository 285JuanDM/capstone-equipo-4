import React, { useEffect, useState } from 'react';
import { getUserEnrollments } from '../services/enrollmentService';
import { getCoursesByIds } from '../services/coursesService';
import CourseCard from '../components/CourseCard';
import '../styles/MyCourses.css';

const TEMP_USER_ID = "julian.d.alvarado23@gmail.com";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMyCourses() {
      try {
        setLoading(true);
        
        const enrollments = await getUserEnrollments(TEMP_USER_ID);
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
  }, []);

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
