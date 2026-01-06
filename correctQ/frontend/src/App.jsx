import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Exam from "./components/Exam";
import History from "./components/History";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
function App() {
  return (
    <>
      <div className="flex w-full h-screen overflow-hidden">
        
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/exam/:examId" element={<Exam />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
