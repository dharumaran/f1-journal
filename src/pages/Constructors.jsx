import { constructors } from "../data/constructors";
import { drivers } from "../data/drivers";
import { races } from "../data/races";
import { calculateDriverStats } from "../utils/calculateStats";
import { calculateConstructorStats } from "../utils/calculateConstructorStats";
import { useNavigate } from "react-router-dom";

function Constructors() {
  const driverStats = calculateDriverStats(drivers, races);
  const teamStats = calculateConstructorStats(constructors, drivers, driverStats);
  const navigate = useNavigate();

  return (
    <div className="page">
      <h2>Constructors</h2>

      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        {constructors.map((team) => {
          const stats = teamStats[team.name] || {
            points: 0,
            wins: 0,
            podiums: 0,
          };

          return (
            <div
              className="card"
              key={team.id}
              onClick={() => navigate(`/constructor/${team.id}`)}  // ✅ FIXED
              style={{
                border: `1px solid ${team.color}`,
                boxShadow: `0 0 15px ${team.color}33`,
                cursor: "pointer", // ✅ FIXED
              }}
            >
              
              <h3>{team.name}</h3>
              <p style={{ opacity: 0.7 }}>{team.country}</p>

              <div style={{ marginTop: "10px" }}>
                <p>Points: {stats.points}</p>
                <p>Wins: {stats.wins}</p>
                <p>Podiums: {stats.podiums}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Constructors;