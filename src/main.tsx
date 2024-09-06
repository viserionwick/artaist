// Essentials
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// Providers
import { ResultsProvider } from "./context/Results.tsx";

// Components
import App from "./App.tsx";

// Styles
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <ResultsProvider>
      <App />
    </ResultsProvider>
  </Router>
)