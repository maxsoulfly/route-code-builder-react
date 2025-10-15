import { useEffect, useState } from "react";

function StationList({ stations, onRemoveStation }) {
  const UI_KEY = "ui.stationList.open";

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

  const [filter, setFilter] = useState("");

  const stationSuggestions = stations.filter(
    ([code, label]) =>
      code.toLowerCase().includes(filter.toLowerCase()) ||
      label.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section>
      <h2 onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
        Stations List {isOpen ? "▲" : "▼"}
      </h2>

      {isOpen && (
        <div className="stack">
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
                  <span className="title">
                    {code} - {label}
                  </span>
                  <button
                    type="button"
                    className="btn blue"
                    onClick={() => navigator.clipboard.writeText(`${label}`)}
                  >
                    Copy Label
                  </button>
                  <button
                    type="button"
                    className="btn red"
                    onClick={() => onRemoveStation(code)}
                  >
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
