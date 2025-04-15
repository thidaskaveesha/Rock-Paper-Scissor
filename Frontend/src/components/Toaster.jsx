import React from "react";
import "../styles/global.css";

function Toaster({ message, type }) {
    if (!message) return null;

    return (
        <div className={`toaster toaster-${type}`}>
            {message}
        </div>
    );
}

export default Toaster;
