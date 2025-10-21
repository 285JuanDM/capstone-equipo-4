import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { Back, SidebarBook, SidebarTrophy } from "../assets/AppIcons";
import ProgressBar from "../components/ProgressBar";
import "../styles/CourseRoadmap.css";
import { db } from "../utils/firebase";

export default function CourseRoadmap() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(db, "courses", courseId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCourseData({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No existe el curso");
        }
      } catch (err) {
        console.error("Error al obtener curso:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading)
    return (
      <div className="loader-container">
        <PropagateLoader color="#2563EB" size={15} />
      </div>
  );
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
            <div className="stat-item"> <SidebarTrophy /> {courseData.points || 500} puntos</div>
            <div className="stat-item"> <SidebarBook /> {courseData.totalLessons || 10} lecciones</div>
          </div>
        </div>

        <div className="course-progress-card">
          <h3>Tu progreso</h3>
          <ProgressBar progress={courseData.progress || 20} />
          <div className="stats-details">
            <div>
              <p>Lecciones completadas:</p>
              <strong>{courseData.lessonsCompleted || 2}/{courseData.totalLessons || 10}</strong>
            </div>
            <div>
              <p>Tiempo invertido:</p>
              <strong>{courseData.timeSpent || "2h 30min"}</strong>
            </div>
          </div>
        </div>
      </section>

      <h2 className="roadmap-title">Roadmap del curso</h2>
      <h1 className="roadmap-content">Contenido del Roadmap</h1>
    </article>
  );
}
