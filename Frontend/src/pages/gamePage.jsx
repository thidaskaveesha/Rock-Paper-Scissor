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
                    className="btn" 
                    onClick={navigateToMenu} 
                    aria-label="Go to menu"
                >
                    <FaArrowLeft  className="icon" />
                </button>
                <h1>Game ID: {sessionID}</h1>
            </div>
            <div className="content">
                <h1>Time Left</h1>
                <h2>00:00</h2>
                <p>Make your choice ?</p>
            </div>
            <div className="choice">
                <FaHandRock  className="icon" />
                <FaHandPaper  className="icon" />
                <FaHandScissors  className="icon" />
            </div>
        </div>
    );
}

export default GamePage;
