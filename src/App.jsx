import { Routes, Route } from 'react-router-dom';

import './App.css'

// routes
import MVPPage from './routes/MVPPage';
import GamePage from './routes/GamePage';


function App() {

  return (
    
    <>
      <Routes>
        <Route path="/mvp" element={<MVPPage/>} />
        <Route path="/game" element={<GamePage/>} />
      </Routes>
      

    </>
  )
}

export default App
