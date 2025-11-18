import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";
import CourseRoadmap from "./pages/CourseRoadmap";
import ExploreCourses from "./pages/ExploreCourses";
import { HomePage } from "./pages/HomePage.jsx";
import LessonPage from "./pages/LessonPage";
import Login from "./pages/Login";
import MyBadges from "./pages/MyBadges";
import MyCourses from "./pages/MyCourses";
import MyProgress from "./pages/MyProgress";
import Ranking from "./pages/Ranking";
import SignUp from "./pages/SignUp";
import "./styles/App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loader component
  }

  return user ? <AuthenticatedApp user={user} /> : <UnauthenticatedApp />;
}

function AuthenticatedApp({ user }) {
  return (
    <div className="app-container">
      <Sidebar user={user} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExploreCourses />} />
          <Route path="/mis-cursos" element={<MyCourses />} />
          <Route path="/my-progress" element={<MyProgress />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/badges" element={<MyBadges />} />
          <Route path="/courses/:courseId" element={<CourseRoadmap />} />
          <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

function UnauthenticatedApp() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
