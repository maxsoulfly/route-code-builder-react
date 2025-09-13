import { MODES, CLIMATES, CARGO_BY_CLIMATE } from "../data/dictionaries";

function Inputs({ stations, values, handlers }) {
  const { mode, climate, origin, destination, cargo, routeNumber } = values;
  const {
    setMode,
    setClimate,
    setOrigin,
    setDestination,
    setCargo,
    setRouteNumber,
  } = handlers;

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
            Origin:
            <select
              className="field green"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              {stations
                .sort((a, b) => a[1].localeCompare(b[1]))
                .map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
            </select>
          </label>

          <label>
            Destination:
            <select
              className="field red"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              {stations
                .sort((a, b) => a[1].localeCompare(b[1]))
                .filter(([code]) => code !== origin)
                .map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
            </select>
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

export default Inputs;
