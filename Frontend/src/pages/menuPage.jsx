import React from "react";
import { FaGamepad, FaUserFriends, FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

function MenuPage() {
    const navigate = useNavigate();

    const navigateToCreate = () => {
        navigate("/multiplayer-menu");
    };

    const navigateToJoin = () => {
         navigate("/multiplayer-menu");
    }; 

    const navigateToSinglePlay = () => {
        navigate("/match");
    };

    return (
        <div className="menu-container">
            <h1>Rock Paper Scissor</h1>
            <div className="btn-container">
                <button className="btn purple" onClick={navigateToCreate}>
                    <FaGamepad className="icon" /> Create Game
                </button>
                <button className="btn" onClick={navigateToJoin}>
                    <FaUserFriends className="icon" /> Join Game
                </button>
                <button className="btn green" onClick={navigateToSinglePlay}>
                    <FaRobot className="icon" /> Single Player
                </button>
            </div>
        </div>
    );
}

export default MenuPage;
