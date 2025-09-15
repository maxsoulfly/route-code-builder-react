function Output2({ values }) {
  const { station1, station2, station3, cargo, tag } = values;

  const stationsOut = [station1?.code, station2?.code, station3?.code]
    .filter(Boolean)
    .join(">");
  const cargoOut =
    Array.isArray(cargo) && cargo.length > 0 ? cargo.join("+") : null;

  const output = [
    stationsOut,
    cargoOut, // only added if not null
    tag,
  ]
    .filter(Boolean)
    .join("-");
  return (
    <section>
      <h2>Output</h2>
      <p className="code-output">{output}</p>
      <p>
        <button
          type="button"
          className="btn"
          onClick={() => navigator.clipboard.writeText(`${output}`)}
        >
          Copy Code
        </button>
      </p>
    </section>
  );
}

export default Output2;
