import { useParams } from "react-router-dom";
import { constructors } from "../data/constructors";
import { drivers } from "../data/drivers";
import { races } from "../data/races";
import { calculateDriverStats } from "../utils/calculateStats";

function ConstructorDetails() {
  const { id } = useParams();

  const team = constructors.find((c) => c.id === parseInt(id));
  if (!team) return <p>Team not found</p>;

  const driverStats = calculateDriverStats(drivers, races);

  const teamDrivers = drivers.filter((d) => d.team === team.name);

  const d1 = teamDrivers[0];
  const d2 = teamDrivers[1];

  const d1Points = driverStats[d1?.name]?.points || 0;
  const d2Points = driverStats[d2?.name]?.points || 0;

  const totalPoints = d1Points + d2Points;

  const leader =
    d1Points > d2Points ? d1 : d2Points > d1Points ? d2 : null;

  const gap = Math.abs(d1Points - d2Points);

  return (
    <div className="page">

      {/* 🔥 HEADER */}
      <div
        className="card"
        style={{
          border: `1px solid ${team.color}`,
          boxShadow: `0 0 20px ${team.color}33`,
        }}
      >
        <h1>{team.name}</h1>
        <p style={{ opacity: 0.7 }}>{team.country}</p>
        <h2>{totalPoints} pts</h2>

        {leader && (
          <p style={{ marginTop: "10px" }}>
            🥇 {leader.name} leading by {gap} pts
          </p>
        )}
      </div>

      {/* 📊 DRIVER CONTRIBUTION */}
      <h3 style={{ marginTop: "20px" }}>Driver Contribution</h3>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {teamDrivers.map((driver) => {
          const stats = driverStats[driver.name] || {};
          const pts = stats.points || 0;

          const percent =
            totalPoints > 0
              ? ((pts / totalPoints) * 100).toFixed(1)
              : 0;

          const isLeader = leader?.name === driver.name;

          return (
            <div
              key={driver.id}
              className="card"
              style={{
                border: isLeader ? "2px solid gold" : "",
              }}
            >
              <h3>{driver.name}</h3>
              <p>{pts} pts</p>
              <p style={{ opacity: 0.7 }}>{percent}% contribution</p>

              {isLeader && <p>🥇 Lead Driver</p>}
            </div>
          );
        })}
      </div>

      {/* 🏁 RACE BREAKDOWN (PER DRIVER) */}
      <h3 style={{ marginTop: "30px" }}>Race Contributions</h3>

      <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
        {races.map((race) => {
          const saved = JSON.parse(localStorage.getItem(`race-${race.id}`));

          let d1Pts = 0;
          let d2Pts = 0;

          if (saved) {
            const { positions = [] } = saved;
            const pointsTable = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

            const d1Index = positions.indexOf(d1?.name);
            const d2Index = positions.indexOf(d2?.name);

            if (d1Index !== -1) d1Pts = pointsTable[d1Index] || 0;
            if (d2Index !== -1) d2Pts = pointsTable[d2Index] || 0;
          }

          return (
            <div
              key={race.id}
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <strong>{race.name}</strong>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{d1?.name}</span>
                <span>{d1Pts} pts</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{d2?.name}</span>
                <span>{d2Pts} pts</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ConstructorDetails;