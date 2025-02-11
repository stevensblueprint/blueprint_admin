import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import EventDisplay from "../components/Events";
import { ChakraProvider } from "@chakra-ui/react";

function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <ChakraProvider>
        <EventDisplay />
      </ChakraProvider>
    </div>
  );
}

export default App;
