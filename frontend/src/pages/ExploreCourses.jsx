import { useEffect, useMemo, useState } from "react";
import CourseCard from "../components/CourseCard";
import Topbar from "../components/Topbar";
import Filter from "../components/Filter";
import { getCourses } from "../services/coursesService";
import { getUserEnrollments } from "../services/enrollmentService";
import "../styles/ExploreSection.css";

export default function ExploreCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    level: "",
  });

  // Hardcoded user ID for demonstration
  const userId = "julian.d.alvarado23@gmail.com";

  useEffect(() => {
    const fetchCoursesAndEnrollments = async () => {
      try {
        // Fetch all courses
        const coursesData = await getCourses();
        setCourses(coursesData);

        // Fetch user enrollments
        const enrollments = await getUserEnrollments(userId);
        const enrolledCourseIds = new Set(enrollments.map((e) => e.courseId));
        setEnrolledCourses(enrolledCourseIds);
      } catch (error) {
        console.error("Error fetching courses or enrollments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoursesAndEnrollments();
  }, [userId]);

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
