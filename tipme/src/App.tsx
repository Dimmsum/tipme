import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/Auth";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page as the default route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
