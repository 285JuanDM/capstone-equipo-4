import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CourseRoadmap from "./pages/CourseRoadmap";
import ExploreCourses from "./pages/ExploreCourses";
import Explore from "./pages/Explore";
import MyProgress from "./pages/MyProgress";
import Ranking from "./pages/Ranking";
import LessonPage from "./pages/LessonPage";
import MyBadges from "./pages/MyBadges";
import MyCourses from "./pages/MyCourses";
import "./styles/App.css";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ExploreCourses />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/mis-cursos" element={<MyCourses />} />
            <Route path="/my-progress" element={<MyProgress />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/badges" element={<MyBadges />} />
            <Route path="/courses/:courseId" element={<CourseRoadmap />} />
            <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
