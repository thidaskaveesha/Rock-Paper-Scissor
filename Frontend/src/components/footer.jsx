import React from "react";

function Footer() {
    return (
        <footer className="footer">
            <p>&copy; 2025 Rock | Paper | Scissors. All rights reserved.</p>
            <nav>
                <ul>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms of Service</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
            </nav>
        </footer>
    );
}

export default Footer;