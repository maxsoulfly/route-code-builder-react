import { useState, useEffect } from "react";
import suggestCode from "../utils/suggestCode"; // optional: or keep inside this file

function AddStation({ onAddStation, stations }) {
  const [newStationCode, setNewStationCode] = useState("");
  const [newStationLabel, setNewStationLabel] = useState("");
  const [newStationWarning, setNewStationWarning] = useState("");

  const UI_KEY = "ui.addStation.open";

  const safeParseBool = (v, fallback) => {
    try {
      const parsed = JSON.parse(v);
      return typeof parsed === "boolean" ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem(UI_KEY);
    return saved ? safeParseBool(saved, true) : true;
  });

  useEffect(() => {
    localStorage.setItem(UI_KEY, JSON.stringify(isOpen));
  }, [isOpen]);
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
      <h2 onClick={() => setIsOpen((v) => !v)} style={{ cursor: "pointer" }}>
        Add Station {isOpen ? "▲" : "▼"}
      </h2>

      {isOpen && (
        <div className="stack">
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
        </div>
      )}

      {newStationWarning && (
        <p className="warnings-output warning">{newStationWarning}</p>
      )}
    </section>
  );
}

export default AddStation;
