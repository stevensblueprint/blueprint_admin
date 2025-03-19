import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Members from "../pages/Members";
import Performance from "../pages/Performance";

function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/members" element={<Members />} />
        <Route path="/performance" element={<Performance />} />
      </Routes>
    </div>
  );
}

export default App;
