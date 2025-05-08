import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/menuPage";
import GamePage from "./pages/gamePage";
import Toaster from "./components/Toaster";
import MultiplayerMenu from "./pages/MultiplayerMenu";
import CreateGame from "./pages/CreateGame";
import JoinGame from "./pages/JoinGame";

import { useState } from "react";
import { useLocation } from 'react-router-dom';


function App() {
  const [toast, setToast] = useState({ message: "", type: "" });

  return (
    <>
      <Toaster message={toast.message} type={toast.type} />
      <Router>
        <Routes>
          <Route path="/" element={<MenuPage />} />          
          <Route path="/multiplayer-menu" element={<MultiplayerMenu />} />
          <Route path="/create-game" element={<CreateGame />} />
          <Route path="/join-game" element={<JoinGame />} />
          <Route path="/match" element={<GamePage />} />          
          <Route path="/match/:sessionId" element={<GamePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
