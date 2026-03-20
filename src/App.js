import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RaceDetails from "./pages/RaceDetails";
import Navbar from "./components/Navbar";
import Drivers from "./pages/Drivers";
import DriverDetails from "./pages/DriverDetails";
import Constructors from "./pages/Constructors";
import Predictions from "./pages/Predictions";
import "./styles/global.css";
import Leaderboard from "./pages/Leaderboard";
import ConstructorDetails from "./pages/ConstructorDetails";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", background: "#000", minHeight: "100vh", color: "white" }}>
        <h1>F1 2026 Journal</h1>

        <Navbar /> {/* ✅ MOVE IT HERE */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/race/:id" element={<RaceDetails />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/driver/:id" element={<DriverDetails />} />
          <Route path="/constructors" element={<Constructors />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/constructor/:id" element={<ConstructorDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;