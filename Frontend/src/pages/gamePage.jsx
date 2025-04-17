import React from "react";
import { FaArrowLeft, FaHandRock, FaHandPaper, FaHandScissors  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

function GamePage() {
    const navigate = useNavigate();
    const DEFAULT_SESSION_ID = "XXXXX"; // Default value for sessionID

    const navigateToMenu = () => {
        navigate("/");
    };

    let sessionID = localStorage.getItem("sessionID") || DEFAULT_SESSION_ID;

    return (
        <div className="match-container">
            <div className="header">
                <button 
                    className="backBtn white" 
                    onClick={navigateToMenu} 
                    aria-label="Go to menu"
                >
                    <FaArrowLeft  className="icon" />
                </button>
                <h1 className="header-text">Game ID: {sessionID}</h1>
                <p></p>
            </div>
            <div className="content">
                <h2>Time Left</h2>
                <h1>00:00</h1>
                <p>Make your choice ?</p>
            </div>
            <div className="choice">
                <FaHandRock  className="game-icon" id="Rock"/>
                <FaHandPaper  className="game-icon" id="Paper"/>
                <FaHandScissors  className="game-icon" id="Scissor"/>
            </div>
        </div>
    );
}

export default GamePage;
