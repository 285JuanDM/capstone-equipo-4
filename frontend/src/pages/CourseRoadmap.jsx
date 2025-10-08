import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  if (loading) return <p>Cargando curso...</p>;
  if (!courseData) return <p>No se encontró el curso.</p>;

  return (
    <div className="roadmap-container">
      <a className="back-btn" onClick={() => navigate(-1)}>
        ← Volver
      </a>

      <section className="course-header">
        <div>
          <span className="course-level">{courseData.level}</span>
          <h1>{courseData.title}</h1>
          <p>{courseData.description}</p>
          <div className="course-stats">
            <span>🏆 {courseData.points || 0} puntos</span>
            <span>📘 {courseData.totalLessons || 0} lecciones</span>
          </div>
        </div>
      </section>

      <h2>Roadmap del curso</h2>
      <div className="roadmap-content">Contenido del Roadmap</div>
    </div>
  );
}
