import { useEffect, useMemo, useState } from "react";
import CourseCard from "../components/CourseCard";
import Topbar from "../components/Topbar";
import Filter from "../components/Filter";
import { getCourses } from "../services/coursesService";
import { getUserEnrollments } from "../services/enrollmentService";
import { useAuth } from "../contexts/AuthContext.jsx"; // 1. Importar el hook
import "../styles/ExploreSection.css";

export default function ExploreCourses() {
  const { user } = useAuth(); // 2. Obtener el usuario del contexto
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    level: "",
  });

  // 3. Se elimina el userId hardcodeado

  useEffect(() => {
    const fetchCoursesAndEnrollments = async () => {
      try {
        setLoading(true);
        // Obtener todos los cursos siempre
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
  }, [user]); // 4. El efecto depende del usuario

  const handleFilterChange = (newFilter) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilter }));
  };

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((course) =>
        filters.category ? course.category === filters.category : true
      )
      .filter((course) => (filters.level ? course.level === filters.level : true));
  }, [courses, searchTerm, filters]);

  if (loading) return <p>Cargando cursos...</p>;

  return (
    <section className="main-content-explore">
      <Topbar onSearch={setSearchTerm} />
      <Filter onFilterChange={handleFilterChange} />
      <div className="courses-grid">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={{ ...course, isEnrolled: enrolledCourses.has(course.id) }}
          />
        ))}
      </div>
    </section>
  );
}
