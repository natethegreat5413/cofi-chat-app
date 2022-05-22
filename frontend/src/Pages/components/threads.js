import React from "react";
import "./Threads.css";

export function Threads({ onClick, chatName }) {
    return (
        <div className="thread" onClick={onClick}>
            <p className="thread-text">{chatName}</p>
        </div>
    );
}
