import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Back, SidebarBook, SidebarTrophy } from "../assets/AppIcons";
import LessonListItem from "../components/LessonListItem";
import ProgressBar from "../components/ProgressBar";
import { enrollInCourse, getUserEnrollments } from "../services/enrollmentService";
import { getCourseLessons } from "../services/lessonService";
import "../styles/CourseRoadmap.css";
import { db } from "../utils/firebase";

export default function CourseRoadmap() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const userId = "julian.d.alvarado23@gmail.com";

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const docRef = doc(db, "courses", courseId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCourseData({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No existe el curso");
          setLoading(false);
          return;
        }

        const enrollments = await getUserEnrollments(userId);
        const currentEnrollment = enrollments.find(e => e.courseId === courseId);
        setEnrollmentData(currentEnrollment);

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
  }, [courseId, userId]);

  const handleEnroll = async () => {
    setIsEnrolling(true);
    try {
      const result = await enrollInCourse(userId, courseId);
      if (result.status === "success" || result.status === "already_enrolled") {
        const enrollments = await getUserEnrollments(userId);
        const currentEnrollment = enrollments.find(e => e.courseId === courseId);
        setEnrollmentData(currentEnrollment);
      }
    } catch (error) {
      console.error("Error en el proceso de inscripción:", error);
    } finally {
      setIsEnrolling(false);
    }
  };
  
  const handleLessonClick = (lessonId) => {
    navigate(`/courses/${courseId}/lessons/${lessonId}`);
  };

  const getLessonStatus = (lessonId, index) => {
    if (!enrollmentData) return 'locked'; 

    const completedLessons = enrollmentData.completedLessons || [];
    if (completedLessons.includes(lessonId)) {
      return 'completed';
    }

    // La primera lección siempre está desbloqueada si el usuario está inscrito
    if (index === 0) {
      return 'unlocked';
    }

    // Una lección está desbloqueada si la anterior está completada
    const previousLessonId = lessons[index - 1].id;
    if (completedLessons.includes(previousLessonId)) {
      return 'unlocked';
    }

    return 'locked';
  };

  if (loading) return <p>Cargando curso...</p>;
  if (!courseData) return <p>No se encontró el curso.</p>;

  const isEnrolled = !!enrollmentData;

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
            <button className="enroll-btn" onClick={handleEnroll} disabled={isEnrolling}>
              {isEnrolling ? "Inscribiendo..." : "Inscribirme ahora"}
            </button>
          ): null}
        </div>

        {isEnrolled && (
          <div className="course-progress-card">
            <h3>Tu progreso</h3>
            <ProgressBar progress={enrollmentData.progress || 0} />
            <div className="stats-details">
              <div>
                <p>Lecciones completadas:</p>
                <strong>
                  {enrollmentData.completedLessons?.length || 0}/{lessons.length}
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
            lessons.map((lesson, index) => (
              <LessonListItem 
                key={lesson.id} 
                lesson={lesson}
                status={getLessonStatus(lesson.id, index)}
                onClick={handleLessonClick}
              />
            ))
          ) : (
            <p>Aún no hay lecciones en este curso.</p>
          )}
        </div>
      </section>
    </article>
  );
}
