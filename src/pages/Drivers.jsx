import { drivers } from "../data/drivers";
import { races } from "../data/races";
import { calculateDriverStats } from "../utils/calculateStats";
import { constructors } from "../data/constructors";
import { useNavigate } from "react-router-dom";

function Drivers() {
  const stats = calculateDriverStats(drivers, races);
  const navigate = useNavigate();

  const getTeamColor = (teamName) => {
    const team = constructors.find((c) => c.name === teamName);
    return team ? team.color : "#e10600";
  };

  return (
    <div className="page">
      <h2>Drivers</h2>

      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        {drivers.map((driver) => {
          const driverStats = stats[driver.name] || {
            points: 0,
            wins: 0,
            podiums: 0,
            dnfs: 0,
            races: 0,
          };

          return (
            
            <div
              className="card"
              key={driver.id}
              onClick={() => navigate(`/driver/${driver.id}`)}
              style={{
                border: `1px solid ${getTeamColor(driver.team)}`,
                boxShadow: `0 0 15px ${getTeamColor(driver.team)}33`,
                cursor: "pointer",
                
              
              }}
            >
              <h3>{driver.name}</h3>

              <p style={{ opacity: 0.7 }}>
                {driver.team} • {driver.country}
              </p>
              <div style={{
  fontSize: "24px",
  fontWeight: "bold",
  opacity: 0.3
}}>
  #{driver.number}
</div>

              <div style={{ marginTop: "10px" }}>
                <p>Points: {driverStats.points}</p>
                <p>Wins: {driverStats.wins}</p>
                <p>Podiums: {driverStats.podiums}</p>
                <p>DNFs: {driverStats.dnfs}</p>
                <p>Races: {driverStats.races}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Drivers;