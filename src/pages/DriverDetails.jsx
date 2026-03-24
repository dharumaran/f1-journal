import { useParams, useNavigate } from "react-router-dom";
import { drivers } from "../data/drivers";
import { races } from "../data/races";
import { calculateDriverStats } from "../utils/calculateStats";
import { constructors } from "../data/constructors";

function DriverDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ added

  const driver = drivers.find((d) => d.id === parseInt(id));
  if (!driver) return <p>Driver not found</p>;

  const stats = calculateDriverStats(drivers, races);
  const driverStats = stats[driver.name] || {};

  const team = constructors.find((c) => c.name === driver.team);

  return (
    <div className="page">
      
      {/* 🔥 HERO SECTION */}
      <div
        className="card"
        style={{
          border: `1px solid ${team?.color}`,
          boxShadow: `0 0 20px ${team?.color}33`,
        }}
      >
        <h1>{driver.name}</h1>
        <p style={{ opacity: 0.7 }}>
          {driver.team} • {driver.country}
        </p>
      </div>

      {/* 📊 STATS GRID */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          marginTop: "20px",
        }}
      >
        <div className="card">
          <h3>{driverStats.points || 0}</h3>
          <p>Points</p>
        </div>

        <div className="card">
          <h3>{driverStats.wins || 0}</h3>
          <p>Wins</p>
        </div>

        <div className="card">
          <h3>{driverStats.podiums || 0}</h3>
          <p>Podiums</p>
        </div>

        <div className="card">
          <h3>{driverStats.dnfs || 0}</h3>
          <p>DNFs</p>
        </div>

        <div className="card">
          <h3>{driverStats.races || 0}</h3>
          <p>Races</p>
        </div>

        <div className="card">
          <h3>{driverStats.dotd || 0}</h3>
          <p>DOTD ⭐</p>
        </div>
      </div>

      {/* 🏁 RACE HISTORY */}
      <h3 style={{ marginTop: "30px" }}>Race History</h3>

      <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
        {races.map((race) => {
          const saved = JSON.parse(localStorage.getItem(`race-${race.id}`));

          let result = "-";

          if (saved) {
            const { positions = [], dnf = [] } = saved;

            const index = positions.indexOf(driver.name);

            if (index !== -1) result = `P${index + 1}`;
            else if (dnf.includes(driver.name)) result = "DNF";
          }

          return (
            <div
              key={race.id}
              className="card"
              onClick={() => navigate(`/race/${race.id}`)} // ✅ navigation added
              style={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer", // ✅ makes it obvious
                transition: "0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = `1px solid ${team?.color}`;
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = "1px solid transparent";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <span>{race.name}</span>
              <strong>{result}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DriverDetails;