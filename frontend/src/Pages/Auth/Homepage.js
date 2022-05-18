import React from "react";
import { Login, Register } from "./components";
import "./Homepage.css";

export function Homepage() {
    return (
        <div className="home-container">
            <Login />
            {/* <Register /> */}
        </div>
    );
}
