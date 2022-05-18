import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import { Homepage, Chatpage } from "./Pages";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" exact element={<Homepage />} />
                <Route path="/chats" element={<Chatpage />} />
            </Routes>
        </div>
    );
}

export default App;
