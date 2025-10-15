import React, { useEffect, useState, useRef } from "react";
import { downloadExport, parseBackup, applyBackup } from "../utils/backup";

async function handleImportFile(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const text = await file.text();
  const res = parseBackup(text);

  if (!res.ok) {
    console.error(res.error);
  } else {
    applyBackup(res.payload); // <-- use payload, not res
  }
  e.target.value = "";
}

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

  const fileInputRef = useRef(null);

  return (
    <section>
      <h2 onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
        Back Up {isOpen ? "▲" : "▼"}
      </h2>

      {isOpen && (
        <div className="stack">
          <p className="row">
            <button
              type="button"
              className="btn green"
              onClick={downloadExport}
            >
              Export JSON
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="application/json"
              style={{ display: "none" }}
              onChange={handleImportFile}
            />

            <button
              type="button"
              className="btn yellow"
              onClick={() => fileInputRef.current?.click()}
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
