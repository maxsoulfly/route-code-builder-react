function StationList({ stations, onRemoveStation }) {
  return (
    
    <section>
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
    </section>
  );
}

export default StationList;
