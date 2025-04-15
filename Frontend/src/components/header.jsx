import React from "react";

function Header() {
    return (
        <header className="header">
            <h1>Game Title</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/menu">Menu</a></li>
                    <li><a href="/waiting">Waiting Room</a></li>
                    <li><a href="/match">Match</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
