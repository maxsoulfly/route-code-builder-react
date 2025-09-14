import { useState } from "react";

import { MODES, CLIMATES, CARGO_BY_CLIMATE } from "../data/dictionaries";

function Inputs2({ stations, values, handlers }) {
  const { mode, climate, station1, station2, station3, cargo, routeNumber } = values;
  const {
    setMode,
    setClimate,
    setStation1,
    setStation2,
    setStation3,
    setCargo,
    setRouteNumber,
  } = handlers;
  const [station1Focused, setStation1Focused] = useState(false);
  const [station2Focused, setStation2Focused] = useState(false);
  const [station3Focused, setStation3Focused] = useState(false);


  const station1Suggestions = stations.filter(([code, label]) =>
    code.toLowerCase().includes(station1?.code.toLowerCase()) ||
    label.toLowerCase().includes(station1?.label.toLowerCase())
  );
  const station2Suggestions = stations.filter(([code, label]) =>
    code.toLowerCase().includes(station2?.code.toLowerCase()) ||
    label.toLowerCase().includes(station2?.label.toLowerCase())
  );
  const station3Suggestions = stations.filter(([code, label]) =>
    code.toLowerCase().includes(station3?.code.toLowerCase()) ||
    label.toLowerCase().includes(station3?.label.toLowerCase())
  );

  return (
    <section>
      <div className="stack">
        <h2>Inputs</h2>

        <label>
          Climate
          <select
            className="field yellow"
            value={climate}
            onChange={(e) => setClimate(e.target.value)}
          >
            {CLIMATES.map(([code, label]) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <div className="row">
          <label>
            Mode:
            <select
              className="field blue"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              {MODES.map(([code, label]) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
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

        <div className="row">
          <label>
            Station 1:
            <input type="text" className="field green"
              value={station1?.label || ""} 
              onChange={(e) => setStation1({code:"", label: e.target.value})}
              onFocus={() => setStation1Focused(true)}
              onBlur={() => setStation1Focused(false)}
            />

              <div className="suggestions-container">
                {station1Focused && station1 && 
                !stations.some(([code, label]) =>
                  label.toLowerCase() === station1.label.toLowerCase() ||
                  code.toLowerCase() === station1.code.toLowerCase()
                ) && (
                  <ul className="suggestions-list">
                    {station1Suggestions
                      .sort((a, b) => a[1].localeCompare(b[1]))
                      .map(([code, label]) => (
                        <li key={code} 
                          className="row" 
                          onMouseDown={() => setStation1({ code, label })}>
                          <span>{code} - {label}</span>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
          </label>
          

          <label>
            Station 2:
            <input type="text" className="field yellow"
              value={station2?.label || ""} 
              onChange={(e) => setStation2({code:"", label: e.target.value})}
              onFocus={() => setStation2Focused(true)}
              onBlur={() => setStation2Focused(false)}
            />

              
              <div className="suggestions-container">
                {station2Focused && station2 && 
                !stations.some(([code, label]) =>
                  label.toLowerCase() === station2.label.toLowerCase() ||
                  code.toLowerCase() === station2.code.toLowerCase()
                ) && (
                  <ul className="suggestions-list">
                    {station2Suggestions
                      .sort((a, b) => a[1].localeCompare(b[1]))
                      .map(([code, label]) => (
                        <li key={code} className="row" onMouseDown={() => setStation2({ code, label })}>
                          <span>{code} - {label}</span>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
          </label>

          <label>
            Station 3:
            <input type="text" className="field red"
              value={station3?.label||""} 
              onChange={(e) => setStation3({code:"", label: e.target.value})}
              onFocus={() => setStation3Focused(true)}
              onBlur={() => setStation3Focused(false)}
            />

              
              <div className="suggestions-container">
                {station3Focused &&station3 && 
                !stations.some(([code, label]) =>
                  label.toLowerCase() === station3.label.toLowerCase() ||
                  code.toLowerCase() === station3.code.toLowerCase()
                ) && (
                  <ul className="suggestions-list">
                    {station3Suggestions
                      .sort((a, b) => a[1].localeCompare(b[1]))
                      .map(([code, label]) => (
                        <li key={code} className="row" onMouseDown={() => setStation3({ code, label })}>
                          <span>{code} - {label}</span>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
          </label>
          
        </div>

        <label>
          Route Number{" "}
          <input
            value={routeNumber}
            type="number"
            onChange={(e) => setRouteNumber(e.target.value)}
          />
        </label>

      </div>
    </section>
  );
}

export default Inputs2;
