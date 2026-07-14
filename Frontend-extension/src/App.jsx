import { Routes, Route } from "react-router-dom";
import FocusPage from "./pages/focus/FocusPage";
import BlockingPage from "./pages/blocking/BlockingPage";
import AnalyticPage from "./pages/analytics/AnalyticPage";
import Navbar from "./components/Nav";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <div className="bg-neutral-tertiary">
      <Navbar />
      <div className="min-h-screen max-h-full max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<FocusPage />} />
          <Route path="/analytics" element={<AnalyticPage />} />
          <Route path="/blocking" element={<BlockingPage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;