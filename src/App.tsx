import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";

const App: React.FC = () => {
  return (
    <div className="l-App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate to="/" />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  )
}

export default App;