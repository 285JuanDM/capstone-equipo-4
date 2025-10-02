import { db } from "./utils/firebase";
import { collection, getDocs } from "firebase/firestore";


function App() {

  testFirestore();

  return (
    <>
      <div> Hello World</div>
    </>
  )
}

async function testFirestore() {
  const querySnapshot = await getDocs(collection(db, "courses"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

export default App
