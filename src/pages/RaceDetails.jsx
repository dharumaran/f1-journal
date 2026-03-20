import { useParams } from "react-router-dom";
import { races } from "../data/races";
import { useState, useEffect } from "react";
import { drivers } from "../data/drivers";

function RaceDetails() {
  const { id } = useParams();
  const race = races.find((r) => r.id === parseInt(id));

  // 🏁 Race
  const [positions, setPositions] = useState(Array(10).fill(""));

  // 🏎 Sprint
  const [hasSprint, setHasSprint] = useState(false);
  const [sprintPositions, setSprintPositions] = useState(Array(8).fill(""));

  // ⚡ Extras
  const [driverOfTheDay, setDriverOfTheDay] = useState("");
  const [fastestLap, setFastestLap] = useState("");

  // 💥 Status
  const [dnf, setDnf] = useState("");
  const [dns, setDns] = useState("");

  // 📝 Notes
  const [notes, setNotes] = useState("");

  // ✅ Load saved data
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(`race-${id}`));

    if (savedData) {
      setPositions(savedData.positions || Array(10).fill(""));
      setSprintPositions(savedData.sprintPositions || Array(8).fill(""));
      setHasSprint(savedData.hasSprint || false);
      setDriverOfTheDay(savedData.driverOfTheDay || "");
      setFastestLap(savedData.fastestLap || "");
      setDnf((savedData.dnf || []).join(", "));
      setDns((savedData.dns || []).join(", "));
      setNotes(savedData.notes || "");
    }
  }, [id]);

  // ✅ Save data
  const handleSave = () => {
    const data = {
      positions,
      sprintPositions,
      hasSprint,
      driverOfTheDay,
      fastestLap,
      dnf: dnf.split(",").map((d) => d.trim()).filter(Boolean),
      dns: dns.split(",").map((d) => d.trim()).filter(Boolean),
      notes,
    };

    localStorage.setItem(`race-${id}`, JSON.stringify(data));
    alert("Saved!");
  };

  if (!race) return <p>Race not found</p>;

  return (
    <div
      className="page"
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "900px" }}>
        <h2>{race.name}</h2>
        <p>{race.date}</p>

        <div className="card">
          {/* 🏎 Sprint Toggle */}
          <div className="toggleRow">
  <span>Sprint Weekend</span>

  <label className="switch">
    <input
      type="checkbox"
      checked={hasSprint}
      onChange={() => setHasSprint(!hasSprint)}
    />
    <span className="slider"></span>
  </label>
</div>

          {/* 🏎 Sprint Section */}
          {hasSprint && (
            <div style={{ marginTop: "20px" }}>
              <h3>Sprint Results</h3>
              <div className="grid">
                {sprintPositions.map((driverName, index) => (
                  <select
                    key={index}
                    value={driverName}
                    onChange={(e) => {
                      const updated = [...sprintPositions];
                      updated[index] = e.target.value;
                      setSprintPositions(updated);
                    }}
                  >
                    <option value="">P{index + 1}</option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            </div>
          )}

          {/* 🏁 Race Positions */}
          <div style={{ marginTop: "20px" }}>
            <h3>Race Positions</h3>
            <div className="grid">
              {positions.map((driverName, index) => (
                <select
                  key={index}
                  value={driverName}
                  onChange={(e) => {
                    const updated = [...positions];
                    updated[index] = e.target.value;
                    setPositions(updated);
                  }}
                >
                  <option value="">P{index + 1}</option>
                  {drivers.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          </div>

          {/* ⚡ Extras */}
          <div style={{ marginTop: "20px" }}>
            <h4>Fastest Lap</h4>
            <select
              value={fastestLap}
              onChange={(e) => setFastestLap(e.target.value)}
            >
              <option value="">Select Driver</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>

            <h4 style={{ marginTop: "15px" }}>Driver of the Day</h4>
            <select
              value={driverOfTheDay}
              onChange={(e) => setDriverOfTheDay(e.target.value)}
            >
              <option value="">Select Driver</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* 💥 Status */}
          <div style={{ marginTop: "20px" }}>
            <h4>DNF</h4>
            <input
              placeholder="e.g. Verstappen, Norris"
              value={dnf}
              onChange={(e) => setDnf(e.target.value)}
            />

            <h4 style={{ marginTop: "15px" }}>DNS</h4>
            <input
              placeholder="e.g. Hamilton"
              value={dns}
              onChange={(e) => setDns(e.target.value)}
            />
          </div>

          {/* 📝 Notes */}
          <div style={{ marginTop: "20px" }}>
            <textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* ✅ Save */}
          <button className="btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default RaceDetails;