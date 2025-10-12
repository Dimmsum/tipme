import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page as the default route */}
        <Route path="/" element={<LandingPage />} />

        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
