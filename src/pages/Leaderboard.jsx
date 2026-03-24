import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ added
import { drivers } from "../data/drivers";
import { constructors } from "../data/constructors";
import { races } from "../data/races";
import { calculateDriverStats } from "../utils/calculateStats";
import { calculateConstructorStats } from "../utils/calculateConstructorStats";

function Leaderboard() {
  const [mode, setMode] = useState("drivers");
  const navigate = useNavigate(); // ✅ added

  const driverStats = calculateDriverStats(drivers, races);
  const constructorStats = calculateConstructorStats(
    constructors,
    drivers,
    driverStats
  );

  // Sort drivers
  const sortedDrivers = [...drivers].sort(
    (a, b) =>
      (driverStats[b.name]?.points || 0) -
      (driverStats[a.name]?.points || 0)
  );

  // Sort constructors
  const sortedConstructors = [...constructors].sort(
    (a, b) =>
      (constructorStats[b.name]?.points || 0) -
      (constructorStats[a.name]?.points || 0)
  );

  return (
    <div className="page">
      <h2>Leaderboard</h2>

      {/* 🔁 Toggle */}
      <div style={{ marginBottom: "20px" }}>
        <button
          className="btn"
          onClick={() => setMode("drivers")}
          style={{ marginRight: "10px" }}
        >
          Drivers
        </button>

        <button className="btn" onClick={() => setMode("constructors")}>
          Constructors
        </button>
      </div>

      {/* 🏁 Drivers */}
      {mode === "drivers" && (
        <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
          {sortedDrivers.map((driver, index) => {
            const stats = driverStats[driver.name] || {};

            return (
              <div
                key={driver.id}
                className="card"
                onClick={() => navigate(`/driver/${driver.id}`)} // ✅ added
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div>
                  <strong>
                    {index + 1}. {driver.name}
                  </strong>
                  <p style={{ opacity: 0.7 }}>
                    {driver.team} • {driver.country}
                  </p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p>{stats.points || 0} pts</p>
                  <p style={{ fontSize: "12px", opacity: 0.7 }}>
                    W: {stats.wins || 0} | P: {stats.podiums || 0} | DNF:{" "}
                    {stats.dnfs || 0}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 🏎️ Constructors */}
      {mode === "constructors" && (
        <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
          {sortedConstructors.map((team, index) => {
            const stats = constructorStats[team.name] || {};

            const rankStyle = () => {
              if (index === 0) return { boxShadow: "0 0 20px gold" };
              if (index === 1) return { boxShadow: "0 0 15px silver" };
              if (index === 2) return { boxShadow: "0 0 15px #cd7f32" };
              return {};
            };

            return (
              <div
                key={team.id}
                className="card"
                onClick={() => navigate(`/constructor/${team.id}`)} // ✅ added (optional but good)
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: `1px solid ${team.color}`,
                  cursor: "pointer",
                  transition: "0.2s",
                  ...rankStyle(),
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div>
                  <strong>
                    {index + 1}. {team.name}
                  </strong>
                  <p style={{ opacity: 0.7 }}>{team.country}</p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p>{stats.points || 0} pts</p>
                  <p style={{ fontSize: "12px", opacity: 0.7 }}>
                    W: {stats.wins || 0} | P: {stats.podiums || 0}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;