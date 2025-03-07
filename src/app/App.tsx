import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Members from "../pages/Members";

function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/members" element={<Members />} />
      </Routes>
    </div>
  );
}

export default App;
