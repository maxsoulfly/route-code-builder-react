import { Routes, Route, Link } from "react-router-dom";

import "./App.css";

// routes
import MVPPage from "./routes/MVPPage";
import Generator2Page from "./routes/Generator2Page";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Nav/>
      <Routes>
        <Route path="/mvp" element={<MVPPage />} />
        <Route path="/generator" element={<Generator2Page />} />
      </Routes>

    </>
  );
}

export default App;
