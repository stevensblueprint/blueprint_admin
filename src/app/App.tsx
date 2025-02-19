import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TeamLayout from "../pages/TeamLayout"; // Adjust the import path as necessary

function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team/:teamId" element={<TeamLayout />} />
      </Routes>
    </div>
  );
}

export default App;
