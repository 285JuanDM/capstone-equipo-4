import "../styles/CourseSection.css";
import CourseCard from "./CourseCard";

export default function CourseSection({ title, courses }) {
  return (
    <section className="course-section">
      <h2>{title}</h2>
      <div className="course-grid">
        {courses.map((course, i) => (
          <CourseCard key={i} {...course} />
        ))}
      </div>
    </section>
  );
}
