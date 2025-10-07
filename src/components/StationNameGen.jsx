import { useEffect, useState } from "react";
import {
  MODES,
  CLIMATES,
  CARGO_BY_CLIMATE,
  STATION_SUFFIXES,
} from "../data/dictionaries";

function getRandomSuffixes(suffixes, count = 5) {
  const shuffled = [...suffixes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function StationNameGen({ climate }) {
  const [cityName, setCityName] = useState("");
  const [cargo, setCargo] = useState("PASS");
  const suffixes = STATION_SUFFIXES[cargo] || [];
  const [roll, setRoll] = useState(0);

  const UI_KEY = "ui.stationNameGen.open";

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
    return saved ? safeParseBool(saved, false) : false;
  });

  useEffect(() => {
    localStorage.setItem(UI_KEY, JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <section>
      <div className="stack">
        <h2 onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
          Station Names Generator {isOpen ? "▲" : "▼"}
        </h2>

        {isOpen && (
          <div>
            <div className="row">
              <label>
                City Name
                <input
                  className="field blue"
                  value={cityName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCityName(value);
                  }}
                />
              </label>

              <label>
                Cargo
                <select
                  className="field blue"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                >
                  {CARGO_BY_CLIMATE[climate].map(([code, label]) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="stack">
              <button className="btn blue" onClick={() => setRoll(roll + 1)}>
                Roll Again 🎲
              </button>
            </div>

            <ul className="stack">
              {getRandomSuffixes(suffixes, 5).map((suffix, i) => {
                let name = cityName ? `${cityName} ${suffix}` : suffix;

                // 1 in 3 chance to add a random number
                if (Math.random() < 1 / 3) {
                  const num = Math.floor(Math.random() * 100);
                  name += `-${String(num).padStart(2, "0")}`;
                }

                return (
                  <li key={i} className="row">
                    <span>{name}</span>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => navigator.clipboard.writeText(name)}
                    >
                      Copy
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default StationNameGen;
