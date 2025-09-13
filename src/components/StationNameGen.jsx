import { useState } from 'react'
import { MODES, CLIMATES, CARGO_BY_CLIMATE, STATION_SUFFIXES } from "../data/dictionaries";

function StationNameGen({ climate}) {
  const [cityName, setCityName] = useState("");
  const [cargo, setCargo] = useState("PASS");
  const suffixes = STATION_SUFFIXES[cargo] || [];

  
  return (
    
    <section>
          
          <div className="stack">
            <h2>Station Names Generator</h2>

              <input
                placeholder="City Name"
                value={cityName}
                onChange={(e) => {
                  const value = e.target.value;
                  setCityName(value);
                }}
              />
              
              <label>
                Cargo
                <select className="field blue" value={cargo} onChange={(e) => setCargo(e.target.value)}>
                  {CARGO_BY_CLIMATE[climate].map(([code, label]) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

            <ul className="stack">
            {suffixes.slice(0, 5).map((suffix, i) => {
              let name = cityName ? `${cityName} ${suffix}` : suffix;

              // 1 in 20 chance to add a random number
              if (Math.random() < 1 / 20) {
                const num = Math.floor(Math.random() * 100);
                name += `-${num}`;
              }

              return (
                <li key={i} className="row">
                  <span>{name}</span>
                   <button
                      type="button"
                      className="btn"
                      onClick={() => navigator.clipboard.writeText(`${name}`)}
                    >
                      Copy
                    </button>
                </li>
              );
            })}
          </ul>

          </div>
        </section>
  );
}

export default StationNameGen;
