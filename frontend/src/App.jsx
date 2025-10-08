import { collection, getDocs } from "firebase/firestore";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CourseRoadmap from "./pages/CourseRoadmap";
import ExploreCourses from "./pages/ExploreCourses";
import "./styles/App.css";
import { db } from "./utils/firebase";

export default function App() {
  async function testFirestore() {
    const querySnapshot = await getDocs(collection(db, "courses"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }

  testFirestore();

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ExploreCourses />} />
            <Route path="/course/:courseId" element={<CourseRoadmap />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
