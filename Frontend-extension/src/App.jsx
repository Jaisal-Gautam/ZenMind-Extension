import { Routes, Route } from "react-router-dom";
import FocusPage from "./pages/focus/FocusPage";
import BlockingPage from "./pages/blocking/BlockingPage";
import AnalyticPage from "./pages/analytics/AnalyticPage";
import Auth from "./pages/auth/Auth";
import Navbar from "./components/Nav";
function App() {

  return (
    <div className="bg-neutral-tertiary">
    <Navbar/>
    <div className="min-h-screen max-h-full max-w-7xl mx-auto">
      <Routes>
        <Route path="/" element={<FocusPage/>} />
        <Route path="/analytics" element={<AnalyticPage/>} />
        <Route path="/blocking" element={<BlockingPage/>} />
        <Route path="/auth" element={<Auth/>} />
      </Routes>
    </div>
    </div>
  );
}

export default App;