import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import MyQrCode from "./pages/MyQrCode";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page as the default route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/myqrcode" element={<MyQrCode />} />

        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
