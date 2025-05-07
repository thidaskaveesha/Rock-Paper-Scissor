import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

function GamePage() {
    const navigate = useNavigate();
    const DEFAULT_SESSION_ID = "XXXXX"; // Default value for sessionID
    const CHOICES = ["Rock", "Paper", "Scissors"];
    const DEFAULT_CHOICE = "Rock";

    const [timer, setTimer] = useState(10); // Set timer to 10 seconds
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [selectedChoice, setSelectedChoice] = useState(null); // New state
    const [result, setResult] = useState(null);
    const [shakes, setShakes] = useState(false);

    // Timer logic
    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        } else if (timer === 0 && !userChoice) {
            handleUserChoice(DEFAULT_CHOICE);
        }
    }, [timer, userChoice]);

    // Handle user's choice
    const handleUserChoice = (choice) => {
        if (userChoice) return; // Prevent multiple choices
        const randomChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
        setUserChoice(choice);
        setSelectedChoice(choice); // Set the clicked choice
        setComputerChoice(randomChoice);
        determineResult(choice, randomChoice);
    };

    // Determine the result
    const determineResult = (user, computer) => {
        setShakes(true);
        setTimeout(() => {
            if (user === computer) {
                setResult("Computer Decided " + computer + " and you decided " + user + " so, " +"It's a Draw!");
            } else if (
                (user === "Rock" && computer === "Scissors") ||
                (user === "Paper" && computer === "Rock") ||
                (user === "Scissors" && computer === "Paper")
            ) {
                setResult("Computer Decided " + computer + " and you decided " + user + " so, " +"You Win!");
            } else {
                setResult("Computer Decided " + computer + " and you decided " + user + " so, " +"You Lose!");
            }
            setShakes(false);
        }, 3000); // Simulate 3 shakes (3 seconds delay)
    };

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
                    <FaArrowLeft className="icon" />
                </button>
                <h1 className="header-text">Game ID: {sessionID}</h1>
            </div>
            <div className="content">
                <h2>Time Left</h2>
                <h1>{timer}s</h1>
                <p>Make your choice!</p>
                {result && <h3 className="result">{result}</h3>}
            </div>
            <div className={`choice ${shakes ? "shaking" : ""}`}>
                {CHOICES.map((choice) => {
                    if (choice === "Rock") {
                        return (
                            <FaHandRock
                                key={choice}
                                className={`game-icon ${selectedChoice ? "selected" : ""}`}
                                id="Rock"
                                onClick={() => handleUserChoice(choice)}
                            />
                        );
                    } else if (choice === "Paper") {
                        return (
                            <FaHandPaper
                                key={choice}
                                className={`game-icon ${selectedChoice ? "selected" : ""}`}
                                id="Paper"
                                onClick={() => handleUserChoice(choice)}
                            />
                        );
                    } else if (choice === "Scissors") {
                        
                        return (
                            <FaHandScissors
                                key={choice}
                                className={`game-icon ${selectedChoice ? "selected" : ""}`}
                                id="Scissors"
                                onClick={() => handleUserChoice(choice)}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

export default GamePage;
