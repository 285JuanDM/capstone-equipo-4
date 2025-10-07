import "../styles/CourseCard.css";
import ProgressBar from "./ProgressBar";

export default function CourseCard({ title, level, description, progress }) {
  return (
    <div className="course-card">
      <div className="course-banner"></div>
      <div className="course-body">
        <h3>{title}</h3>
        <span className="course-level">{level}</span>
        <p>{description}</p>

        {progress ? (
          <ProgressBar progress={progress} />
        ) : (
          <button className="course-btn">Inscribirse</button>
        )}
      </div>
    </div>
  );
}
