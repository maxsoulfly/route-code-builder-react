import { useState } from "react";
function StationList({ stations, onRemoveStation }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    
    <section>
      <h2 onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
        Stations List {isOpen ? "▲" : "▼"}
      </h2>

      {isOpen && (
        <div>
          <ul className="stack">
            {stations
            .sort((a, b) => a[1].localeCompare(b[1]))
            .map(([code, label]) => (
              <li key={code} className="row">
                <span>{code} - {label}</span>
                <button type="button" className="btn" onClick={() => onRemoveStation(code)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default StationList;
