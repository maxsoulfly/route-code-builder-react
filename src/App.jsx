import { Routes, Route, Link } from "react-router-dom";

import "./App.css";

// routes
import MVPPage from "./routes/MVPPage";
import Generator2Page from "./routes/Generator2Page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/mvp" element={<MVPPage />} />
        <Route path="/generator" element={<Generator2Page />} />
      </Routes>

      <h2>Links</h2>
      <ul>
        <li>
          <Link to="/mvp">Route Code Generator ver 1.0</Link>
        </li>
        <li>
          <Link to="/generator">Route Code Generator ver 2.0</Link>
        </li>
      </ul>
    </>
  );
}

export default App;
