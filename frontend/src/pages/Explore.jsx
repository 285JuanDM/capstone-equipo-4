import { useEffect, useMemo, useState } from "react";
import { getCourses } from "../services/coursesService";
import { getUserEnrollments } from "../services/enrollmentService";
import CourseSection from "../components/CourseSection";
import "../styles/ExploreSection.css";

export default function Explore() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());

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

  const groupedCourses = useMemo(() => {
    // Group by category
    const grouped = courses.reduce((acc, course) => {
      const { category } = course;
      if (!acc[category]) {
        acc[category] = [];
      }
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
