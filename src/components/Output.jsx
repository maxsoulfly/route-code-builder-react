function Output({ values }) {
  const { mode, origin, destination, cargo, routeNumber } = values;
  return (
    <section>
      <h2>Output</h2>
      <p className="code-output">
        {mode}-{origin}&gt;{destination}-{cargo}-{routeNumber.padStart(2, "0")}
      </p>
      <p>
        <button
          type="button"
          className="btn"
          onClick={() =>
            navigator.clipboard.writeText(
              `${mode}-${origin}>${destination}-${cargo}-${routeNumber.padStart(2, "0")}`
            )
          }
        >
          Copy Code
        </button>
      </p>
    </section>
  );
}

export default Output;
