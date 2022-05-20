import React, { useEffect, useState } from "react";
import "./Chatpage.css";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Threads, Chat } from "../Pages/Auth/components/index";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function Chatpage() {
    const [threads, setThreads] = useState(dummy);
    const [message, setMessage] = useState("");
    const [activeChat, setActiveChat] = useState(threads[0]);
    const [activeMessages, setActiveMessages] = useState(threads[2].messages);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalInput, setModalInput] = useState("");

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const newMessage = (e) => {
        const newMessage = [...activeMessages, e];
        setActiveMessages(newMessage);
        console.log("newMessage", newMessage);
        setMessage("");
    };

    const selectChat = (chat) => {
        setActiveChat(chat);
        const newActiveChat = threads.filter((item) => item.id === chat.id);
        setActiveMessages(newActiveChat[0].messages);
    };

    const addThread = () => {
        const thread = {
            id: 5,
            name: modalInput,
            messages: [],
        };
        const newThread = [...threads, thread];
        setThreads(newThread);
        setModalInput("");
        setModalOpen(false);
        console.log(threads);
    };

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    // useEffect(() => {
    //     setActiveMessages(window.localStorage.getItem("activeMessages"));
    // }, []);

    // useEffect(() => {
    //     JSON.parse(
    //         window.localStorage.setItem("activeMessages", threads[2].messages)
    //     );
    // }, [activeMessages]);

    return (
        <div className="page-wrapper">
            <div className="threads">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: ".5rem",
                    }}
                >
                    <h2>Chats</h2>
                    <IconButton onClick={handleOpen}>
                        <AddIcon />
                    </IconButton>
                    <Modal open={modalOpen} onClose={handleClose}>
                        <Box sx={modalStyle}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Add a new thread
                            </Typography>
                            <div style={{ display: "flex" }}>
                                <TextField
                                    value={modalInput}
                                    placeholder="New Thread"
                                    onChange={(e) =>
                                        setModalInput(e.target.value)
                                    }
                                    fullWidth
                                    size="small"
                                ></TextField>
                                <Button
                                    onClick={addThread}
                                    style={{ marginLeft: "1rem" }}
                                    variant="contained"
                                    endIcon={<AddIcon />}
                                >
                                    Add
                                </Button>
                            </div>
                        </Box>
                    </Modal>
                </div>
                <div className="threads-body">
                    {threads?.map((chat, idx) => {
                        // console.log("chat", chat);
                        return (
                            <div
                                key={idx}
                                onClick={() => selectChat(chat)}
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
                <h2 style={{ marginTop: "1rem" }}>{activeChat.name}</h2>
                <div className="chat-body">
                    <ul className="chats">
                        {activeMessages?.map((item, idx) => {
                            return (
                                <div
                                    key={idx}
                                    style={
                                        item.sender === "ndcowley"
                                            ? {
                                                  display: "flex",
                                                  justifyContent: "end",
                                              }
                                            : {
                                                  display: "flex",
                                                  justifyContent: "start",
                                              }
                                    }
                                >
                                    <div
                                        style={{
                                            width: "fit-content",
                                            margin: "1rem 0px",
                                        }}
                                    >
                                        <p className="message-sender">
                                            {item.sender}
                                        </p>
                                        <div
                                            className="message"
                                            style={
                                                item.sender === "ndcowley"
                                                    ? {
                                                          backgroundColor:
                                                              "#1976d2",
                                                      }
                                                    : {}
                                            }
                                            key={idx}
                                        >
                                            <p className="message-content">
                                                {item.content}
                                            </p>
                                        </div>
                                        <p className="message-timestamp">
                                            {item.timestamp}
                                        </p>
                                    </div>
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
                                onClick={() =>
                                    newMessage({
                                        sender: "ndcowley",
                                        timestamp:
                                            new Date().toLocaleTimeString(),
                                        content: message,
                                    })
                                }
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
