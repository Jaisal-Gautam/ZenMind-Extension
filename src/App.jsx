import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your components
import Navbar from "./components/layout/Navbar";
import Analytics from "./pages/Analytics/Analytics"
import Focus from "./pages/Focus/Focus";
import Blocker from "./pages/Blockers/Blocker";
import Setting from "./pages/Settings/Setting";

function App() {
  return (
    <div className="bg-neutral w-full min-h-screen max-h-full">
    <BrowserRouter>
      <Navbar />
      <div className="content-container"> 
        <Routes>
          <Route path="/" element={<Analytics />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/focus" element={<Focus />} />
          <Route path="/blocking" element={<Blocker />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </div>

    </BrowserRouter>
    </div>
  );
}

export default App;