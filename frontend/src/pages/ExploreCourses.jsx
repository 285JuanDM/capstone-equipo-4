import { useEffect, useMemo, useState } from "react";
import CourseSection from "../components/CourseSection";
import Filter from "../components/Filter";
import Topbar from "../components/Topbar";
import { getCourses } from "../services/coursesService";
import { getUserEnrollments } from "../services/enrollmentService";
import "../styles/ExploreSection.css";

export default function ExploreCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: "", level: "" });
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());

  // Hardcoded user ID for demonstration
  const userId = "julian.d.alvarado23@gmail.com";

  useEffect(() => {
    const fetchCoursesAndEnrollments = async () => {
      try {
        // Fetch all published courses
        const coursesData = await getCourses();
        const publishedCourses = coursesData.filter((course) => course.published);
        setCourses(publishedCourses);
        setFilteredCourses(publishedCourses);

        // Fetch user enrollments
        const enrollments = await getUserEnrollments(userId);
        const enrolledCourseIds = new Set(enrollments.map(e => e.courseId));
        setEnrolledCourses(enrolledCourseIds);

      } catch (error) {
        console.error("Error obteniendo cursos o inscripciones:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoursesAndEnrollments();
  }, [userId]);

  const categories = useMemo(() => {
    const allCategories = courses.map((course) => course.category);
    return [...new Set(allCategories)];
  }, [courses]);

  const levels = useMemo(() => {
    const allLevels = courses.map((course) => course.level);
    return [...new Set(allLevels)];
  }, [courses]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
  };

  useEffect(() => {
    let tempCourses = [...courses];
    if (filters.category) {
      tempCourses = tempCourses.filter((c) => c.category === filters.category);
    }
    if (filters.level) {
      tempCourses = tempCourses.filter((c) => c.level === filters.level);
    }
    setFilteredCourses(tempCourses);
  }, [filters, courses]);

  if (loading) return <p>Cargando cursos...</p>;

  return (
    <section className="main-content-explore">
      <Topbar />
      <Filter
        categories={categories}
        levels={levels}
        onFilterChange={handleFilterChange}
      />
      <CourseSection
        title="Resultados"
        courses={filteredCourses.map((c) => ({
          id: c.id,
          title: c.title,
          level: c.level,
          description: c.description,
          isEnrolled: enrolledCourses.has(c.id), // Añadimos la nueva propiedad
        }))}
        isFirst
      />
    </section>
  );
}
