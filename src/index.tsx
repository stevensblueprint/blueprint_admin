import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { Provider } from "./components/ui/provider"
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

if (rootElement !== null) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider >
          <App />
        </Provider >
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  console.error("Failed to find the root element");
}
