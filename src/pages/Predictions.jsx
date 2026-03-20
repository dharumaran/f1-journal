import { useState, useEffect } from "react";
import { races } from "../data/races";
import { drivers } from "../data/drivers";
import { constructors } from "../data/constructors";
import "../styles/predictions.css";

function Predictions() {
  const [players, setPlayers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load saved players
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("predictions"));
    if (saved) setPlayers(saved);
    setLoaded(true);
  }, []);

  // Save players
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("predictions", JSON.stringify(players));
  }, [players, loaded]);

  const addPlayer = () => {
    setPlayers([
      ...players,
      { name: "", drivers: ["", ""], constructors: ["", ""] }
    ]);
  };

  const updatePlayer = (index, field, value, subIndex = null) => {
    const updated = [...players];

    if (subIndex !== null) {
      updated[index][field][subIndex] = value;
    } else {
      updated[index][field] = value;
    }

    setPlayers(updated);
  };

  // Scoring logic
const calculateScore = (player) => {
  let score = 0;

  races.forEach((race) => {
    const saved = JSON.parse(localStorage.getItem(`race-${race.id}`));
    if (!saved) return;

    const { positions = [] } = saved;

    // 🎯 Driver predictions
    player.drivers.forEach((pickedDriver) => {
      if (!pickedDriver) return;

      const index = positions.indexOf(pickedDriver);

      if (index === 0) {
        score += 5; // correct winner
      } else if (index !== -1 && index < 3) {
        score += 3; // podium
      } else if (index !== -1 && index < 5) {
        score += 1; // top 5 (optional bonus)
      }
    });

    // 🏎️ Constructor predictions
    player.constructors.forEach((team) => {
      if (!team) return;

      const teamDrivers = drivers
        .filter((d) => d.team === team)
        .map((d) => d.name);

      const teamPoints = teamDrivers.reduce((acc, driverName) => {
        const index = positions.indexOf(driverName);

        if (index === 0) return acc + 5;
        if (index !== -1 && index < 3) return acc + 3;
        return acc;
      }, 0);

      score += teamPoints;
    });
  });

  return score;
};
  return (
    <div className="page">
      <h2>Predictions</h2>
  
      <button className="add-btn" onClick={addPlayer}>
        Add Player
      </button>
  
      <div className="grid">
        {players.map((player, index) => (
          <div className="card" key={index}>
  
            {/* Name */}
            <input
              placeholder="Player Name"
              value={player.name}
              onChange={(e) =>
                updatePlayer(index, "name", e.target.value)
              }
            />
  
            {/* Driver Picks */}
            <p className="label">Driver Picks (WDC)</p>
  
            <select
              value={player.drivers[0]}
              onChange={(e) =>
                updatePlayer(index, "drivers", e.target.value, 0)
              }
            >
              <option value="">Select Driver 1</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
  
            <select
              value={player.drivers[1]}
              onChange={(e) =>
                updatePlayer(index, "drivers", e.target.value, 1)
              }
            >
              <option value="">Select Driver 2</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
  
            {/* Constructor Picks */}
            <p className="label">Constructor Picks</p>
  
            <select
              value={player.constructors[0]}
              onChange={(e) =>
                updatePlayer(index, "constructors", e.target.value, 0)
              }
            >
              <option value="">Select Team 1</option>
              {constructors.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
  
            <select
              value={player.constructors[1]}
              onChange={(e) =>
                updatePlayer(index, "constructors", e.target.value, 1)
              }
            >
              <option value="">Select Team 2</option>
              {constructors.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
  
            {/* Score */}
            <p className="score">
              Score: {calculateScore(player)}
            </p>
  
          </div>
        ))}
      </div>
    </div>
  );
}

export default Predictions;