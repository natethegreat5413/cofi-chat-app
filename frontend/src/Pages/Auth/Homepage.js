import React, { useState } from "react";
import { Login, Register } from "./components";
import "./Homepage.css";

export function Homepage() {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <div className="home-container">
            {loggedIn && <Login toggle={() => setLoggedIn(false)} />}
            {!loggedIn && <Register toggle={() => setLoggedIn(true)} />}
        </div>
    );
}
