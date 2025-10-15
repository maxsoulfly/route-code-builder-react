import { useEffect, useState } from "react";
import { downloadExport } from "../utils/backup";

function Backup() {
  const UI_KEY = "ui.backup.open";

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
      <h2 onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
        Back Up {isOpen ? "▲" : "▼"}
      </h2>

      {isOpen && (
        <div>
          <p className="row">
            <button
              type="button"
              className="btn green"
              onClick={downloadExport}
            >
              Export JSON
            </button>
            <button
              type="button"
              className="btn yellow"
              onClick={() => {
                console.log("import click");
              }}
            >
              Import JSON
            </button>
          </p>
        </div>
      )}
    </section>
  );
}

export default Backup;
