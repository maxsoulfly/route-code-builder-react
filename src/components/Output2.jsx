function Output2({ values }) {
  const { station1, station2, station3, cargo, routeNumber } = values;

  const stationsOut = [station1?.code, station2?.code, station3?.code]
        .filter(Boolean)
        .join(">");
        
  return (
    <section>
      <h2>Output</h2>
      <p className="code-output">
        {stationsOut}-{cargo}-{routeNumber.padStart(2, "0")}
      </p>
      <p>
        <button
          type="button"
          className="btn"
          onClick={() =>
            navigator.clipboard.writeText(
              `${stationsOut}-${cargo}-${routeNumber.padStart(2, "0")}`
            )
          }
        >
          Copy Code
        </button>
      </p>
    </section>
  );
}

export default Output2;
