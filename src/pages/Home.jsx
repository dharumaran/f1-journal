import { races } from "../data/races";
import { drivers } from "../data/drivers";
import { constructors } from "../data/constructors";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h2>2026 Season</h2>

      <div className="raceGrid">
        {races.map((race) => {
          const savedData = JSON.parse(
            localStorage.getItem(`race-${race.id}`)
          );

          const winner = savedData?.positions?.[0];

          const winnerDriver = drivers.find((d) => d.name === winner);

          const winnerConstructor = constructors.find(
            (c) => c.name === winnerDriver?.team
          );

          const winnerColor = winnerConstructor?.color || "#2a2a2a";

          return (
            <div
              key={race.id}
              className="raceCard"
              onClick={() => navigate(`/race/${race.id}`)}
              style={{
                "--team-color": winnerColor,
              }}
            >
              <h3>{race.name}</h3>
              <p>{race.date}</p>

              {winner && (
                <p className="winnerHover">
                  {winner}
               </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;