import React, { useEffect, useState } from "react";
import "./Chatpage.css";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Threads, Chat } from "../Pages/Auth/components/index";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

export function Chatpage() {
    const [threads, setThreads] = useState(dummy);
    const [message, setMessage] = useState("");
    const [activeChat, setActiveChat] = useState();
    const [activeMessages, setActiveMessages] = useState(threads[2].messages);

    // console.log(activeChat);
    // console.log(activeMessages);
    const newMessage = (e) => {
        e.preventDefault();
        activeMessages.push({
            sender: "ndcowley",
            content: message,
            timestamp: new Date().toLocaleTimeString(),
        });
    };

    const selectChat = (id) => {
        setActiveChat(id);
        const newActiveChat = threads.filter((item) => item.id === id);
        console.log("newActiveChat", newActiveChat[0].messages);
        setActiveMessages(newActiveChat[0].messages);
    };

    return (
        <div className="page-wrapper">
            <div className="threads">
                <h2>Chats</h2>
                <div className="threads-body">
                    {threads.map((chat) => {
                        // console.log("chat", chat);
                        return (
                            <div
                                key={chat.id}
                                onClick={() => selectChat(chat.id)}
                                style={{
                                    borderRadius: "5px",
                                    backgroundColor: "#0cc2d0",
                                    cursor: "pointer",
                                }}
                            >
                                <p style={{ padding: "10px", color: "white" }}>
                                    {chat.name}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <form className="chat">
                <h2>Chat Name</h2>
                <div className="chat-body">
                    <ul className="chats">
                        {activeMessages.map((item, idx) => {
                            return (
                                <div
                                    style={{
                                        width: "fit-content",
                                        margin: "1rem 0px",
                                    }}
                                    key={idx}
                                >
                                    <p className="message-sender">
                                        {item.sender}
                                    </p>
                                    <div className="message" key={idx}>
                                        <p className="message-content">
                                            {item.content}
                                        </p>
                                    </div>
                                    <p className="message-timestamp">
                                        {item.timestamp}
                                    </p>
                                </div>
                            );
                        })}
                    </ul>

                    <div
                        className="chat-box"
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            width: "97%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <TextField
                                variant="outlined"
                                placeholder="send message"
                                size="small"
                                fullWidth
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <Button
                                onClick={newMessage}
                                style={{ marginLeft: "1rem" }}
                                variant="contained"
                                endIcon={<SendIcon />}
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

const Thread = (props) => {
    <div style={{ borderRadius: "5px", backgroundColor: "green" }}>
        <p>{props.name}</p>
    </div>;
};

const dummy = [
    {
        id: 1,
        name: "Test Chat",
        messages: [
            {
                sender: "ndcowley",
                content: "Hey dude",
                timestamp: new Date().toLocaleTimeString(),
            },
            {
                sender: "Joker",
                content: "what do you want",
                timestamp: new Date().toLocaleTimeString(),
            },
            {
                sender: "batman",
                content: "I just want to talk",
                timestamp: new Date().toLocaleTimeString(),
            },
            {
                sender: "commisioner Gordon",
                content: "did you guys see the movie?",
                timestamp: new Date().toLocaleTimeString(),
            },
            {
                sender: "catwoman",
                content: "stop talking, im a cat",
                timestamp: new Date().toLocaleTimeString(),
            },
            {
                sender: "rachel",
                content: "Bruce?",
                timestamp: new Date().toLocaleTimeString(),
            },
        ],
    },
    {
        id: 2,
        name: "Nates Chat",
        messages: [
            {
                sender: "ndcowley",
                content: "Hey dude",
                timestamp: new Date().toLocaleTimeString(),
            },
            {
                sender: "David",
                content: "what do you want",
                timestamp: new Date().toLocaleTimeString(),
            },
            {
                sender: "emily",
                content: "I just want to talk",
                timestamp: new Date().toLocaleTimeString(),
            },
            {
                sender: "Jake",
                content: "did you guys see the movie?",
                timestamp: new Date().toLocaleTimeString(),
            },
            {
                sender: "Nick",
                content: "stop talking, im a cat",
                timestamp: new Date().toLocaleTimeString(),
            },
            {
                sender: "Matt",
                content: "Bruce?",
                timestamp: new Date().toLocaleTimeString(),
            },
        ],
    },
    {
        id: 3,
        name: "Davids Chat",
        messages: [
            {
                sender: "Colby",
                content: "stop it",
                timestamp: new Date().toLocaleTimeString(),
            },
            {
                sender: "Kristin",
                content: ";lakjsd;lfkjasd",
                timestamp: new Date().toLocaleTimeString(),
            },
            {
                sender: "Dallin",
                content: "IListeing top all this",
                timestamp: new Date().toLocaleTimeString(),
            },
            {
                sender: "Austin",
                content: "did you guys see the movie?",
                timestamp: new Date().toLocaleTimeString(),
            },
            {
                sender: "Bishop",
                content: "How you doing",
                timestamp: new Date().toLocaleTimeString(),
            },
            {
                sender: "Jack",
                content: "testing",
                timestamp: new Date().toLocaleTimeString(),
            },
        ],
    },
];
