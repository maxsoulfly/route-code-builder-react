import { useState } from "react";

function StationList({ stations, onRemoveStation }) {
  const [isOpen, setIsOpen] = useState(true);

  const [filter, setFilter] = useState("");

  const stationSuggestions = stations.filter(([code, label]) =>
    code.toLowerCase().includes(filter.toLowerCase()) ||
    label.toLowerCase().includes(filter.toLowerCase())
  );

  
  
  return (
    <section>
      <h2 onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
        Stations List {isOpen ? "▲" : "▼"}
      </h2>

      {isOpen && (
        <div>
          <div className="row">
            
            <label>
              Filter Stations:
              <input
                type="text"
                className="field green"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </label>
          </div>
          <ul className="stack">
            {stationSuggestions
              .sort((a, b) => a[1].localeCompare(b[1]))
              .map(([code, label]) => (
                <li key={code} className="row">
                  <span>{code} - {label}</span>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => onRemoveStation(code)}
                  >
                    Remove
                  </button>
                </li>
              ))
            }

          </ul>
        </div>
      )}
    </section>
  );
}

export default StationList;
