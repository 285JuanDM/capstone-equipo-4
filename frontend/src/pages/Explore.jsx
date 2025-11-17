import { useEffect, useMemo, useState } from "react";
import { getCourses } from "../services/coursesService";
import { getUserEnrollments } from "../services/enrollmentService";
import CourseSection from "../components/CourseSection";
import { useAuth } from "../contexts/AuthContext.jsx"; // 1. Importar el hook
import "../styles/ExploreSection.css";

export default function Explore() {
  const { user } = useAuth(); // 2. Obtener el usuario
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());

  // 3. Eliminar el userId hardcodeado

  useEffect(() => {
    const fetchCoursesAndEnrollments = async () => {
      try {
        setLoading(true);
        // Fetch de todos los cursos
        const coursesData = await getCourses();
        setCourses(coursesData);

        // Si hay un usuario, obtener sus inscripciones
        if (user && user.email) {
          const enrollments = await getUserEnrollments(user.email);
          const enrolledCourseIds = new Set(enrollments.map((e) => e.courseId));
          setEnrolledCourses(enrolledCourseIds);
        } else {
          // Si no hay usuario, el set de inscripciones está vacío
          setEnrolledCourses(new Set());
        }
      } catch (error) {
        console.error("Error fetching courses or enrollments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoursesAndEnrollments();
  }, [user]); // 4. Depender del usuario

  const groupedCourses = useMemo(() => {
    const grouped = courses.reduce((acc, course) => {
      const { category } = course;
      if (!acc[category]) {
        acc[category] = [];
      }
      // Usar el estado actualizado de enrolledCourses para marcar la inscripción
      acc[category].push({ ...course, isEnrolled: enrolledCourses.has(course.id) });
      return acc;
    }, {});

    return grouped;
  }, [courses, enrolledCourses]);

  if (loading) return <p>Cargando cursos...</p>;

  return (
    <section className="main-content-explore">
      {Object.entries(groupedCourses).map(([category, coursesInCategory], index) => (
        <CourseSection
          key={category}
          title={category}
          courses={coursesInCategory}
          isFirst={index === 0}
        />
      ))}
    </section>
  );
}
