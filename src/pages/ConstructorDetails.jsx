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

  // ✅ safer + consistent driver selection
  const teamDrivers = drivers.filter((d) => d.team === team.name);

  const sortedDrivers = [...teamDrivers].sort(
    (a, b) =>
      (driverStats[b.name]?.points || 0) -
      (driverStats[a.name]?.points || 0)
  );

  const [d1, d2] = sortedDrivers;

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

      {/* ⚔️ DRIVER BATTLE (CHART) */}
      <div
        className="card"
        style={{
          marginTop: "20px",
          border: `1px solid ${team.color}`,
        }}
      >
        <h3>Team Battle</h3>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "80px" }}>{d1?.name}</span>

          <div
            style={{
              flex: 1,
              height: "10px",
              background: "#222",
              borderRadius: "10px",
              overflow: "hidden",
              display: "flex",
            }}
          >
            <div
              style={{
                width: `${totalPoints ? (d1Points / totalPoints) * 100 : 0}%`,
                background: team.color,
                transition: "0.5s",
              }}
            />
            <div
              style={{
                width: `${totalPoints ? (d2Points / totalPoints) * 100 : 0}%`,
                background: "#555",
                transition: "0.5s",
              }}
            />
          </div>

          <span style={{ width: "80px", textAlign: "right" }}>
            {d2?.name}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
            fontSize: "14px",
            opacity: 0.8,
          }}
        >
          <span>{d1Points} pts</span>
          <span>{d2Points} pts</span>
        </div>
      </div>

      {/* 📊 DRIVER CONTRIBUTION */}
      <h3 style={{ marginTop: "20px" }}>Driver Contribution</h3>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {sortedDrivers.map((driver) => {
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
                border: isLeader
                  ? "2px solid gold"
                  : "1px solid #222",
                background: isLeader
                  ? "rgba(255,215,0,0.05)"
                  : "",
                transition: "0.2s",
              }}
            >
              <h3>{driver.name}</h3>
              <p>{pts} pts</p>
              <p style={{ opacity: 0.7 }}>
                {percent}% contribution
              </p>

              {isLeader && <p>🥇 Lead Driver</p>}
            </div>
          );
        })}
      </div>

      {/* 🏁 RACE BREAKDOWN */}
      <h3 style={{ marginTop: "30px" }}>Race Contributions</h3>

      <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
        {races.map((race) => {
          const saved = JSON.parse(
            localStorage.getItem(`race-${race.id}`) || "null"
          );

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

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{d1?.name}</span>
                <span>{d1Pts} pts</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
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