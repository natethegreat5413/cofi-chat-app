import React, { useEffect, useState } from "react";
import axios from "axios";

export function Chatpage() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        axios
            .get("/api/chat")
            .then((res) => {
                setChats(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <ul>
                {chats.map((item) => {
                    return <li key={item._id}>{item.chatName}</li>;
                })}
            </ul>
        </div>
    );
}
