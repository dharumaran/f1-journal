import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px 0",
        borderBottom: "1px solid #333",
        marginBottom: "20px",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>Races</Link>
      <Link to="/drivers" style={{ color: "white", textDecoration: "none" }}>Drivers</Link>
      <Link to="/constructors" style={{ color: "white", textDecoration: "none" }}>Constructors</Link>
      <Link to="/predictions" style={{ color: "white", textDecoration: "none" }}>Predictions</Link>
      <Link to="/leaderboard" style={{ color: "white", textDecoration: "none" }}>Leaderboard</Link>
    </div>
  );
}

export default Navbar;