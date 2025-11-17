import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Back, SidebarBook, SidebarTrophy } from "../assets/AppIcons";
import ProgressBar from "../components/ProgressBar";
import { enrollInCourse, getUserEnrollments } from "../services/enrollmentService";
import "../styles/CourseRoadmap.css";
import { db } from "../utils/firebase";
import LessonListItem from "../components/LessonListItem"; // Importamos el nuevo componente

export default function CourseRoadmap() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const userId = "julian.d.alvarado23@gmail.com";

  // Datos de ejemplo para las lecciones
  const mockLessons = [
    { id: 1, title: "Introducción al Curso", contentType: "video", duration: 5 },
    { id: 2, title: "Configuración del Entorno", contentType: "video", duration: 15 },
    { id: 3, title: "Lectura: Conceptos Básicos de React", contentType: "text", duration: 10 },
    { id: 4, title: "Creando tu Primer Componente", contentType: "video", duration: 25 },
    { id: 5, title: "Manejo del Estado con Hooks", contentType: "video", duration: 20 },
    { id: 6, title: "Lectura: El Ciclo de Vida", contentType: "text", duration: 15 },
  ];

  useEffect(() => {
    const fetchCourseAndEnrollment = async () => {
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
        const isUserEnrolled = enrollments.some(
          (enrollment) => enrollment.courseId === courseId
        );
        setIsEnrolled(isUserEnrolled);
      } catch (err) {
        console.error("Error al obtener curso o inscripción:", err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId && userId) {
      fetchCourseAndEnrollment();
    }
  }, [courseId, userId]);

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
              <SidebarBook /> {courseData.totalLessons || 10} lecciones
            </div>
          </div>
          {isEnrolled ? (
            <p className="enrolled-message">Ya estás inscrito en este curso.</p>
          ) : (
            <button
              className="enroll-btn"
              onClick={handleEnroll}
              disabled={isEnrolling}
            >
              {isEnrolling ? "Inscribiendo..." : "Inscribirme ahora"}
            </button>
          )}
        </div>

        <div className="course-progress-card">
          <h3>Tu progreso</h3>
          <ProgressBar progress={courseData.progress || 20} />
          <div className="stats-details">
            <div>
              <p>Lecciones completadas:</p>
              <strong>
                {courseData.lessonsCompleted || 2}/
                {courseData.totalLessons || 10}
              </strong>
            </div>
            <div>
              <p>Tiempo invertido:</p>
              <strong>{courseData.timeSpent || "2h 30min"}</strong>
            </div>
          </div>
        </div>
      </section>

      <h2 className="roadmap-title">Roadmap del curso</h2>
      
      {/* Sección con la lista de lecciones */}
      <section className="roadmap-content">
        <h3>Contenido del Roadmap</h3>
        <div className="lessons-list">
          {mockLessons.map((lesson) => (
            <LessonListItem key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>
    </article>
  );
}
