const API_BASE_URL =  "https://localhost:7153/api";

const createSession = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/session/create`, { method: "POST" });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

const joinSession = async (sessionId, playerId) => {
  if (!sessionId || !playerId) {
    throw new Error("Invalid sessionId or playerId");
  }
  try {
    const response = await fetch(`${API_BASE_URL}/session/join/${sessionId}/${playerId}`, { method: "POST" });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error joining session ${sessionId}:`, error);
    throw error;
  }
};

export { createSession, joinSession }; // Named exports
//export default { createSession, joinSession }; // Default export
