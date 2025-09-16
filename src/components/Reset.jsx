import { useState } from "react";

function Reset() {
  
    const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <h2 onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
          Reset Data {isOpen ? "▲" : "▼"}
        </h2>

        {isOpen && (
          <div>
            <p>This will remove all saved stations, codes, and climate settings from your browser.</p>
            <p className="alert">Once deleted, the data cannot be recovered.</p><br/>
            <p>
              <button
                type="button"
                className="btn red"
                onClick={() => {
                  if (window.confirm("⚠️ Are you sure?\n\nThis will remove all saved stations, codes, and climate settings from your browser.\n\nOnce deleted, the data cannot be recovered.")) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
              >
                Reset Data
              </button>
            </p>
          </div>
        )}
    </section>
  );
}

export default Reset;
