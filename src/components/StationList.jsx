function StationList({ stations, onRemoveStation }) {
  return (
    
    <section>
      <ul className="stack">
        {stations.map(([code, label]) => (
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
