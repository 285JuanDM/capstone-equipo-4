import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import ProgressBar from "../components/ProgressBar";
import { useAuth } from "../contexts/AuthContext";
import { getUserEnrollments } from "../services/enrollmentService";
import { getUserProgress } from "../services/progressService";
import "../styles/HomePage.css";

export function HomePage() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        const userEnrollments = await getUserEnrollments(user.email);
        setEnrollments(userEnrollments);

        const userProgress = await getUserProgress(user.email);
        setProgress(userProgress);
      } catch (err) {
        console.error("Error cargando dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  const isNewUser = enrollments.length === 0;

  return (
    <div className="dashboard-container">
      {/* -------------------- Header -------------------- */}
      <header className="dashboard-header">
        <h1>Bienvenido, {user?.displayName || "Estudiante"} 👋</h1>
        <p className="dashboard-subtitle">
          {isNewUser
            ? "Comencemos tu camino de aprendizaje 🚀"
            : "Continúa donde lo dejaste y sigue progresando 💪"}
        </p>
      </header>

      {isNewUser && (
        <section className="new-user-section">
          <div className="welcome-card">
            <h2>¡Hola! 👋</h2>
            <p>
              Aún no te has inscrito en ningún curso. Explora nuestro catálogo
              y empieza tu primer aprendizaje.
            </p>
            <button
              className="primary-btn"
              onClick={() => (window.location.href = "/explore")}
            >
              Explorar cursos
            </button>
          </div>

          <h3 className="section-title">Cursos recomendados para ti</h3>

          <div className="recommended-grid">
            <div className="recommended-card">
              <img
                src="https://images.unsplash.com/photo-1551033406-611cf9a28f67"
                alt="Curso"
              />
              <h4>Introducción a la computación</h4>
              <button className="secondary-btn">Ver curso</button>
            </div>

            <div className="recommended-card">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998"
                alt="Curso"
              />
              <h4>Excel básico para principiantes</h4>
              <button className="secondary-btn">Ver curso</button>
            </div>
          </div>
        </section>
      )}

      {!isNewUser && (
        <>
          <section className="stats-grid">
            <div className="stat-card">
              <h3>Cursos activos</h3>
              <p className="stat-number">{enrollments.length}</p>
            </div>

            <div className="stat-card">
              <h3>Progreso promedio</h3>
              <p className="stat-number">
                {Math.round(
                  progress.reduce((acc, c) => acc + c.progress, 0) /
                    progress.length
                )}
                %
              </p>
            </div>

            <div className="stat-card">
              <h3>Tiempo estudiado</h3>
              <p className="stat-number">~ {progress.length * 12} min</p>
            </div>
          </section>

          <h2 className="section-title">Tus cursos</h2>

          <section className="course-grid">
            {progress.map((course) => (
              <div key={course.courseId} className="course-card">
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
                  alt={course.title}
                />
                <div className="course-card-body">
                  <h3>{course.title}</h3>
                  <ProgressBar progress={course.progress} />
                </div>
              </div>
            ))}
          </section>

          <h2 className="section-title">Recomendados para ti</h2>

          <section className="recommended-grid">
            <div className="recommended-card">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                alt=""
              />
              <h4>Gestión del tiempo</h4>
              <button className="secondary-btn">Ver curso</button>
            </div>

            <div className="recommended-card">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
                alt=""
              />
              <h4>Fundamentos de programación</h4>
              <button className="secondary-btn">Ver curso</button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
