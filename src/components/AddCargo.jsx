import { useState, useEffect } from "react";
import suggestCargoCode from "../utils/suggestCargoCode"; // optional: or keep inside this file

function AddCargo({ onAddCargo, cargos, handleResetCargos }) {
  const [newCargoCode, setNewCargoCode] = useState("");
  const [newCargoLabel, setNewCargoLabel] = useState("");
  const [newCargoWarning, setNewCargoWarning] = useState("");

  const UI_KEY = "ui.addCargo.open";

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
  const existingCodes = cargos.map(([code]) => code);

  function handleAddCargo() {
    if (!newCargoCode || !newCargoLabel) {
      setNewCargoWarning("Both code and label are required.");
      return;
    }

    if (newCargoCode.length != 2) {
      setNewCargoWarning("Cargo code must be at 2 characters.");
      return;
    }

    // ✅ Passed all checks → add station
    onAddCargo([newCargoCode, newCargoLabel]);
    setNewCargoCode("");
    setNewCargoLabel("");
    setNewCargoWarning("");
  }

  return (
    <section>
      <div className="stack">
        <h2 onClick={() => setIsOpen((v) => !v)} style={{ cursor: "pointer" }}>
          Add Cargo {isOpen ? "▲" : "▼"}
        </h2>

        {isOpen && (
          <>
            <div className="row">
              <input
                placeholder="Code"
                value={newCargoCode}
                onChange={(e) => setNewCargoCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddCargo();
                  }
                }}
              />
              <input
                placeholder="Label"
                value={newCargoLabel}
                onChange={(e) => {
                  const value = e.target.value;
                  setNewCargoLabel(value);
                  setNewCargoCode(suggestCargoCode(value, existingCodes));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddCargo();
                  }
                }}
              />
              <button type="button" className="btn" onClick={handleAddCargo}>
                Add Cargo
              </button>
            </div>
            <div className="row">
              <button
                type="button"
                className="btn red"
                onClick={handleResetCargos}
              >
                Reset custom cargos (this climate)
              </button>
            </div>
          </>
        )}

        {newCargoWarning && (
          <p className="warnings-output warning">{newCargoWarning}</p>
        )}
      </div>
    </section>
  );
}

export default AddCargo;
