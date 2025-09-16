import { useState } from "react";
import suggestCode from "../utils/suggestCode"; // optional: or keep inside this file

function AddStation({ onAddStation, stations }) {
  const [newStationCode, setNewStationCode] = useState("");
  const [newStationLabel, setNewStationLabel] = useState("");
  const [newStationWarning, setNewStationWarning] = useState("");

  const existingCodes = stations.map(([code]) => code);

  function handleAddStation() {
    if (!newStationCode || !newStationLabel) {
      setNewStationWarning("Both code and label are required.");
      return;
    }

    if (newStationCode.length < 2) {
      setNewStationWarning("Station code must be at least 2 characters.");
      return;
    }

    // ✅ Passed all checks → add station
    onAddStation([newStationCode, newStationLabel]);
    setNewStationCode("");
    setNewStationLabel("");
    setNewStationWarning("");
  }

  return (
    <section>
      <div className="stack">
        <h2>Add Station</h2>

        <div className="row">
          <input
            placeholder="Code"
            value={newStationCode}
            onChange={(e) => setNewStationCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddStation();
              }
            }}
          />
          <input
            placeholder="Label"
            value={newStationLabel}
            onChange={(e) => {
              const value = e.target.value;
              setNewStationLabel(value);
              setNewStationCode(suggestCode(value, existingCodes));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddStation();
              }
            }}
          />
          <button type="button" className="btn" onClick={handleAddStation}>
            Add Station
          </button>
        </div>

        {newStationWarning && (
          <p className="warnings-output warning">{newStationWarning}</p>
        )}
      </div>
    </section>
  );
}

export default AddStation;
