import { useNavigate } from "react-router-dom";
import "../styles/CourseCard.css";
import ProgressBar from "./ProgressBar";

export default function CourseCard({ title, level, description, id, isEnrolled }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/courses/${id}`);
  };

  return (
    <article className="course-card" onClick={handleClick}>
      {isEnrolled && <span className="enrolled-badge">Inscrito</span>}
      <div className="course-banner"></div>

      <section className="course-body">
        <div className="course-info">
          <h3>{title}</h3>
          <span className="course-level">{level}</span>
        </div>

        <p>{description}</p>

        {isEnrolled ? (
          <button onClick={handleClick} className="course-btn view-course-btn">
            Ver curso
          </button>
        ) : (
          <button onClick={handleClick} className="course-btn">
            Inscribirse
          </button>
        )}
      </section>
    </article>
  );
}
