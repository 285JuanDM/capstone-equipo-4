import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Back, SidebarBook, SidebarTrophy } from "../assets/AppIcons";
import ProgressBar from "../components/ProgressBar";
import { enrollInCourse, getUserEnrollments } from "../services/enrollmentService";
import "../styles/CourseRoadmap.css";
import { db } from "../utils/firebase";
import LessonListItem from "../components/LessonListItem";
import { getCourseLessons } from "../services/lessonService";

export default function CourseRoadmap() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const userId = "julian.d.alvarado23@gmail.com";

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Obtener datos del curso
        const docRef = doc(db, "courses", courseId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCourseData({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No existe el curso");
          setLoading(false);
          return;
        }

        // Obtener estado de inscripción
        const enrollments = await getUserEnrollments(userId);
        setIsEnrolled(enrollments.some(e => e.courseId === courseId));

        // Obtener lecciones del curso
        const courseLessons = await getCourseLessons(courseId);
        setLessons(courseLessons);

      } catch (err) {
        console.error("Error al obtener los datos del curso:", err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId && userId) {
      fetchCourseData();
    }
  }, [courseId, userId, isEnrolled]);

  const handleEnroll = async () => {
    setIsEnrolling(true);
    try {
      const result = await enrollInCourse(userId, courseId);
      if (result.status === "success" || result.status === "already_enrolled") {
        setIsEnrolled(true);
      }
    } catch (error) {
      console.error("Error en el proceso de inscripción:", error);
    } finally {
      setIsEnrolling(false);
    }
  };

  if (loading) return <p>Cargando curso...</p>;
  if (!courseData) return <p>No se encontró el curso.</p>;

  return (
    <article className="roadmap-container">
      <a className="back-btn" onClick={() => navigate(-1)}>
        <Back /> Volver
      </a>

      <section className="course-header">
        <div className="course-header-info">
          <span className="course-level">{courseData.level}</span>
          <h1>{courseData.title}</h1>
          <p className="course-description">{courseData.description}</p>
          <div className="course-stats">
            <div className="stat-item">
              <SidebarTrophy /> {courseData.points || 500} puntos
            </div>
            <div className="stat-item">
              <SidebarBook /> {lessons.length} lecciones
            </div>
          </div>
          {!isEnrolled ? (
            <button
              className="enroll-btn"
              onClick={handleEnroll}
              disabled={isEnrolling}
            >
              {isEnrolling ? "Inscribiendo..." : "Inscribirme ahora"}
            </button>
          ): null}
        </div>

        {isEnrolled && (
          <div className="course-progress-card">
            <h3>Tu progreso</h3>
            <ProgressBar progress={courseData.progress || 0} />
            <div className="stats-details">
              <div>
                <p>Lecciones completadas:</p>
                <strong>
                  {courseData.lessonsCompleted || 0}/{lessons.length}
                </strong>
              </div>
              <div>
                <p>Tiempo invertido:</p>
                <strong>{courseData.timeSpent || "0min"}</strong>
              </div>
            </div>
          </div>
        )}
      </section>

      <h2 className="roadmap-title">Roadmap del curso</h2>
      
      <section className="roadmap-content">
        <div className="lessons-list">
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <LessonListItem key={lesson.id} lesson={lesson} />
            ))
          ) : (
            <p>Aún no hay lecciones en este curso.</p>
          )}
        </div>
      </section>
    </article>
  );
}
