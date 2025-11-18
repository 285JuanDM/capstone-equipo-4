import { useEffect, useMemo, useState } from "react";
import { Filters } from "../assets/AppIcons.jsx";
import CourseCard from "../components/CourseCard";
import Filter from "../components/Filter";
import Topbar from "../components/Topbar";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getCourses } from "../services/coursesService";
import { getUserEnrollments } from "../services/enrollmentService";
import "../styles/ExploreSection.css";

export default function ExploreCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    level: "",
  });

  useEffect(() => {
    const fetchCoursesAndEnrollments = async () => {
      try {
        setLoading(true);
        const coursesData = await getCourses();
        setCourses(coursesData);

        if (user && user.email) {
          const enrollments = await getUserEnrollments(user.email);
          const enrolledCourseIds = new Set(enrollments.map((e) => e.courseId));
          setEnrolledCourses(enrolledCourseIds);
        } else {
          setEnrolledCourses(new Set());
        }
      } catch (error) {
        console.error("Error fetching courses or enrollments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoursesAndEnrollments();
  }, [user]);

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

      <div className="topbar-row">
        <Topbar onSearch={setSearchTerm} />

        <button
          className="toggle-filters-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filters />
        </button>
      </div>


      <div className={`filters-wrapper ${showFilters ? "open" : ""}`}>
        <Filter onFilterChange={handleFilterChange} />
      </div>

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
