import React, { useEffect } from "react";
import axios from "axios";

export function Chatpage() {
    useEffect(() => {
        axios
            .get("/api/chat")
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h1>Chatpage is working</h1>
        </div>
    );
}
