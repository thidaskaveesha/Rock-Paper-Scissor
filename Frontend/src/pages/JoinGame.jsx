import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "../styles/global.css"; // Assuming you have a global CSS file
import { joinSession } from "../services/api";

function JoinGame() {
    const [sessionId, setSessionId] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [playerId, setPlayerId] = useState(localStorage.getItem('playerId') || '');
    
    useEffect(() => {
        if (!playerId) {
            const newPlayerId = uuidv4();
            setPlayerId(newPlayerId);
            localStorage.setItem('playerId', newPlayerId);
        }
    }, [playerId]);

    const handleJoinGame = async () => {
        setError("");
        if (!sessionId.trim()) {
            setError("Please enter a session ID.");
            return;
        }

        try {
            await joinSession(sessionId, playerId);
            navigate(`/match?sessionId=${sessionId}&mode=multiplayer`);
        } catch (err) {
            setError(err.message || "Failed to join session.");
        }
    };

    return (
        <div className="container">
            <h1 className="title">Join Game Session</h1>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
                <label htmlFor="sessionId" className="label">
                    Session ID:
                </label>
                <input
                    type="text"
                    id="sessionId"
                    className="input"
                    placeholder="Enter Session ID"
                    required
                    value={sessionId}
                    onChange={(e) => {
                        setSessionId(e.target.value.toUpperCase());
                        setError(""); // Clear error on change
                    }}
                />
            </div>
            <button className="btn" onClick={handleJoinGame}>
                Join Game
            </button>
        </div>
    );
}

export default JoinGame;