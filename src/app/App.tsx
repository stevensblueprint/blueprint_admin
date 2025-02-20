import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Events from "../pages/Events";

function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </div>
  );
}

export default App;
