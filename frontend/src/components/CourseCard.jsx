import "../styles/CourseCard.css";
import ProgressBar from "./ProgressBar";

export default function CourseCard({ title, level, description, progress }) {
  return (
    <article className="course-card">
      <div className="course-banner"></div>

      <section className="course-body">
        <div className="course-info">
          <h3>{title}</h3>
          <span className="course-level">{level}</span>
        </div>

        <p>{description}</p>

        {progress ? (
          <ProgressBar progress={progress} />
        ) : (
          <button className="course-btn">Inscribirse</button>
        )}
      </section>
    </article>
  );
}
