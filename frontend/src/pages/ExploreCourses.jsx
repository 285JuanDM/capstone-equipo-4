import { useEffect, useState } from "react";
import CourseSection from "../components/CourseSection";
import Topbar from "../components/Topbar";
import { getCourses } from "../services/coursesService";
import "../styles/ExploreSection.css";

export default function ExploreCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        const published = data.filter(course => course.published);
        setCourses(published);
      } catch (error) {
        console.error("Error obteniendo cursos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <p>Cargando cursos...</p>;

  return (
    <section className="main-content-explore">
      <Topbar />
      <CourseSection
        title="Nuestra recomendación para ti"
        courses={courses.map(c => ({
          id: c.id,
          title: c.title,
          level: c.level,
          description: c.description,
        }))}
        isFirst
      />

      <CourseSection
        title="Comienza tu viaje"
        courses={courses.map(c => ({
          title: c.title,
          level: c.level,
          description: c.description,
        }))}
      />
    </section>
  );
}

