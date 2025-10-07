import Topbar from "../components/Topbar";
import CourseSection from "../components/CourseSection";

export default function ExploreCourses() {
  const courses = [
    {
      title: "Introducción a la programación",
      level: "Principiante",
      description: "Aprende los fundamentos de la programación con ejercicios interactivos",
    },
    {
      title: "Lógica de programación",
      level: "Principiante",
      description: "Aprende a pensar como un programador desde cero",
    },
    {
      title: "Pensamiento Computacional",
      level: "Intermedio",
      description: "Desarrolla habilidades para resolver problemas de forma lógica",
      progress: 30,
    },
  ];

  return (
    <>
      <Topbar />
      <CourseSection title="✨ Nuestra recomendación para ti" courses={courses} />
      <CourseSection title="💙 Comienza tu viaje" courses={courses} />
    </>
  );
}
