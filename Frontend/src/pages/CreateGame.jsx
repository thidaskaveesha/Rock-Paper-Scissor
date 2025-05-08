import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import "../styles/global.css";
import { createSession } from "../services/api";

function CreateGame() {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playerJoined, setPlayerJoined] = useState(false);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const handleCreateSession = async () => {
      setLoading(true);
      try {
        const response = await createSession();
        setSessionId(response.data.sessionId);
      } catch (error) {
        console.error("Error creating session:", error);
      }
      setLoading(false);
    };
    handleCreateSession();
  }, []);

  useEffect(() => {
    if (sessionId) {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5124/gamehub")
        .build();

      setConnection(newConnection);
    }
  }, [sessionId]);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log("SignalR connection started");
          connection.invoke("JoinSession", sessionId, "host");
          connection.on("PlayerJoined", (playerId) => {
            console.log("Player joined:", playerId);
            setPlayerJoined(true);
          });
        })
        .catch((err) => console.error("SignalR connection error:", err));

      return () => {
        if (connection) {
          connection.stop();
        }
      };
    }
  }, [connection, sessionId]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sessionId);
      alert("Session ID copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const startGame = () => {
    navigate(`/match`, {
      state: { sessionId: sessionId, mode: "multiplayer" },
    });
  };

  return (
    <div className="container">
      <h1>Create Game Session</h1>
      {loading ? (
        <p>Creating session...</p>
      ) : (
        <div className="session-info">
          <p>Your Session ID:</p>
          <h2>{sessionId}</h2>
          <div className="button-group">
            <button className="btn" onClick={copyToClipboard}>
              Copy ID
            </button>
          </div>
          {playerJoined && (
            <>
              <p>Player joined! Click Start Game.</p>
              <button className="btn purple" onClick={startGame}>
                Start Game
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CreateGame;