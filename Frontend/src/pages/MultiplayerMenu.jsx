import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css"; // Assuming you have some global styles

function MultiplayerMenu() {
  const navigate = useNavigate();

  const navigateToCreateGame = () => {
    navigate("/create-game");
  };

  const navigateToJoinGame = () => {
    navigate("/join-game");
  };

  return (
    <div className="menu-container"> {/* Using the same container class as MenuPage */}
      <h1>Multiplayer</h1>
      <div className="btn-container"> {/* Using the same button container class */}
        <button className="btn purple" onClick={navigateToCreateGame}>
          Create Game
        </button>
        <button className="btn" onClick={navigateToJoinGame}>
          Join Game
        </button>
      </div>
    </div>
  );
}

export default MultiplayerMenu;