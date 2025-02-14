import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { EnvironmentProvider  } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

if (rootElement !== null) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <EnvironmentProvider >
          <App />
        </EnvironmentProvider >
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  console.error("Failed to find the root element");
}
