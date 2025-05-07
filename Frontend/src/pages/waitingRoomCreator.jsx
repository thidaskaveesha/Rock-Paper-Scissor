import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function WaitingRoomCreator() {
    const [gameCreated, setGameCreated] = useState(false);
    const [playerJoined, setPlayerJoined] = useState(false);
    const [timer, setTimer] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        if (playerJoined) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            const timeout = setTimeout(() => {
                navigate("/match"); // Navigate to the game page
            }, 3000);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [playerJoined, navigate]);

    const handleCreateGame = () => {
        setGameCreated(true);
    };

    const handlePlayerJoin = () => {
        setPlayerJoined(true);
    };

    return (
        <div className="waiting-page">
            <h1>Waiting Room Creator</h1>
            {!gameCreated ? (
                <button onClick={handleCreateGame} className="btn-create-game">
                    Create Game
                </button>
            ) : (
                <>
                    <p>Game created! Waiting for players to join...</p>
                    {!playerJoined ? (
                        <button onClick={handlePlayerJoin} className="btn-wait">
                            Simulate Player Join
                        </button>
                    ) : (
                        <>
                            <p>Player joined! Starting game in {timer} seconds...</p>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default WaitingRoomCreator;
