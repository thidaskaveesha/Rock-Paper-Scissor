const API_BASE_URL = "https://localhost:7153/api"; // Replace with your actual backend URL if needed

const api = {
  createSession: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/session/create`, {
        method: "POST",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating session:", error);
      throw error;
    }
  },
  joinSession: async (sessionId, playerId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/session/join/${sessionId}/${playerId}`, { method: "POST" });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error joining session ${sessionId}:`, error);
      throw error;
    }
  },
};
export default api;
