import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Attendance from "../pages/Attendance";

function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </div>
  );
}

export default App;
