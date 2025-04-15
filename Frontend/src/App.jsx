import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from './pages/menuPage';
import WaitingRoomCreator from './pages/waitingRoomCreator';
import WaitingRoomJoiner from './pages/waitingRoomJoiner';
import GamePage from './pages/gamePage';
import Toaster from './components/Toaster';

import { useState } from "react";

function App() {
  const [toast, setToast] = useState({ message: "", type: "" });

  return (
    <>
      <Toaster message={toast.message} type={toast.type} />
      <Router>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/waiting-room-creator" element={<WaitingRoomCreator />} />
          <Route path="/waiting-room-joiner" element={<WaitingRoomJoiner />} />
          <Route path="/match" element={<GamePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
