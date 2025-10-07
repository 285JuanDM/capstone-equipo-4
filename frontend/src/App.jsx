import { db } from "./utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import Sidebar from "./components/Sidebar";
import ExploreCourses from "./pages/ExploreCourses";
import "./styles/App.css";

export default function App() {

  async function testFirestore() {
  const querySnapshot = await getDocs(collection(db, "courses"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
  }

  testFirestore()
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <ExploreCourses />
      </main>
    </div>
  );
}





