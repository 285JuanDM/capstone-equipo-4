import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CourseRoadmap from "./pages/CourseRoadmap";
import ExploreCourses from "./pages/ExploreCourses";
import MyProgress from "./pages/MyProgress";
import Ranking from "./pages/Ranking"; // Importar Ranking
import LessonPage from "./pages/LessonPage";
import "./styles/App.css";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ExploreCourses />} />
            <Route path="/my-progress" element={<MyProgress />} />
            <Route path="/ranking" element={<Ranking />} /> // Añadir ruta de Ranking
            <Route path="/courses/:courseId" element={<CourseRoadmap />} />
            <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
