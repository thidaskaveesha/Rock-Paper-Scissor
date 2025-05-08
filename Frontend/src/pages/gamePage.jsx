import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/global.css";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

function GamePage({ mode, sessionId }) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSessionId = queryParams.get("sessionId") || sessionId;
    const CHOICES = ["Rock", "Paper", "Scissors"];
    const DEFAULT_CHOICE = "Rock";
    const playerId = localStorage.getItem("playerId") || Math.random().toString(36).substring(2, 9);
    localStorage.setItem("playerId", playerId);
    const connectionRef = useRef(null);

    const [timer, setTimer] = useState(10);
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [result, setResult] = useState(null);
    const [shakes, setShakes] = useState(false);
    const [opponentChoice, setOpponentChoice] = useState(null);
    const [userScore, setUserScore] = useState(0);
    const [opponentScore, setOpponentScore] = useState(0);
    const [roundResult, setRoundResult] = useState(null);
    const [gameState, setGameState] = useState(null);
    const [sessionID, setSessionID] = useState(initialSessionId);

    useEffect(() => {
        const initializeMultiplayer = async () => {
            if (mode === "multiplayer" && initialSessionId) {
                const newConnection = new HubConnectionBuilder()
                    .withUrl("https://localhost:7020/gamehub")
                    .configureLogging(LogLevel.Information)
                    .build();

                connectionRef.current = newConnection;

                newConnection.on("ReceiveChoice", (receivedPlayerId, choice) => {
                    if (receivedPlayerId !== playerId) {
                        setOpponentChoice(choice);
                    }
                });

                newConnection.on("SessionEnded", () => {
                    console.log("Session ended by server.");
                    setGameState("GameOver");
                    alert("Session ended");
                });

                newConnection.on("ReceiveGameState", (receivedGameState) => {
                    setGameState(receivedGameState.gameState);
                    setUserScore(receivedGameState.userScore);
                    setOpponentScore(receivedGameState.opponentScore);
                    setRoundResult(receivedGameState.result);

                });

                try {
                    await newConnection.start();
                    console.log("SignalR Connected.");
                    await newConnection.invoke("JoinSession", initialSessionId, playerId);
                    const gameState = await newConnection.invoke("GetInitialGameState", initialSessionId);
                    setGameState(gameState);

                } catch (err) {
                    console.error("SignalR Connection Error:", err);
                }
            }
        };
        initializeMultiplayer();


        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop().then(() => console.log("SignalR Disconnected."));
            }
        };
    }, [mode, initialSessionId]);

    // Timer logic
    useEffect(() => {
        if (mode === "singleplayer") {
            if (timer > 0) {
                const countdown = setTimeout(() => setTimer(timer - 1), 1000);
                return () => clearTimeout(countdown);
            } else if (timer === 0 && !userChoice) {
                handleUserChoice(DEFAULT_CHOICE);
            }
        }
    }, [timer, userChoice, mode]);

    // Handle user's choice
    const handleUserChoice = (choice) => {
        setUserChoice(choice)
        setSelectedChoice(choice);
        if (mode === "singleplayer") {
            const randomChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
            setComputerChoice(randomChoice);
            determineResult(choice, randomChoice);
        } else if (connectionRef.current && sessionID) {
            connectionRef.current.invoke("BroadcastChoice", sessionID, playerId, choice);
        }
    };

    // Determine the result
    const determineResult = (user, computer) => {
        setShakes(true);
        setTimeout(() => {
            if (user === computer) {
                setResult("Computer Decided " + computer + " and you decided " + user + " so, " + "It's a Draw!");
            } else if (
                (user === "Rock" && computer === "Scissors") ||
                (user === "Paper" && computer === "Rock") ||
                (user === "Scissors" && computer === "Paper")
            ) {
                setResult("Computer Decided " + computer + " and you decided " + user + " so, " + "You Win!");
            } else {
                setResult("Computer Decided " + computer + " and you decided " + user + " so, " + "You Lose!");
            }
            setShakes(false);
        }, 3000); // Simulate 3 shakes (3 seconds delay)
    };

    const navigateToMenu = () => {
        navigate("/");
    };

    return (
        <div className="match-container">
            <div className="header">
                <button className="backBtn white" onClick={navigateToMenu} aria-label="Go to menu">
                    <FaArrowLeft className="icon" />
                </button>
                <div className="header-info">
                    <h1 className="header-text">{mode === "multiplayer" ? `Game ID: ${sessionID}` : "Singleplayer Mode"}</h1>
                    {mode === "multiplayer" && (
                        <div className="scores">
                            <p>You: {userScore}</p>
                            <p>Opponent: {opponentScore}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="result-round-game">
                {roundResult && <h3 className="result">{roundResult}</h3>}
                {gameState === "GameOver" && <h3 className="result">Game Over</h3>}
            </div>
            <div className="content">
                <h2>Time Left</h2>
                <h1>{timer}s</h1>
                <p>Make your choice!</p>
                {result && <h3 className="result">{result}</h3>}
            </div>
            <div className={`choice ${shakes ? "shaking" : ""} ${mode === "multiplayer" && !opponentChoice ? "waiting" : ""}`}>
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
