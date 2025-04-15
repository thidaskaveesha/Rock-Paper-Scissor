import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from './pages/menuPage';
import WaitingPage from './pages/waitingPage';
import MatchPage from './pages/matchPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/waiting-room" element={<WaitingPage />} />
        <Route path="/match" element={<MatchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
