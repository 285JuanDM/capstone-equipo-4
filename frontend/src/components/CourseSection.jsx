import { Star } from "../assets/AppIcons";
import "../styles/CourseSection.css";
import CourseCard from "./CourseCard";

export default function CourseSection({ title, courses, isFirst }) {
  return (
    <section className="course-section">

      <div className="decoration">
        {
          isFirst &&
          <Star />
        }

        <h2>{title}</h2>
      </div>

      <div className="course-grid">
        {courses.map((course, i) => (
          <CourseCard key={i} {...course} />
        ))}
      </div>
    </section>
  );
}
