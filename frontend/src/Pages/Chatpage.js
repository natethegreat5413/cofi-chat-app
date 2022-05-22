import React, { useEffect, useState } from "react";
import "./Chatpage.css";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Chat, ChatBox } from "./components";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import RefreshIcon from "@mui/icons-material/Refresh";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { SpinnerCircular } from "spinners-react";
import { useNavigate } from "react-router-dom";

export function Chatpage() {
    const [threads, setThreads] = useState();
    const [message, setMessage] = useState("");
    const [activeChat, setActiveChat] = useState();
    const [activeMessages, setActiveMessages] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalInput, setModalInput] = useState("");
    const [userInfo, setUserInfo] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    useEffect(() => {
        //// FETCH CHATS ////
        axios.get("/api/chat").then((res) => {
            const reversedData = res.data.reverse();
            setThreads(reversedData);
            setActiveChat(reversedData[0]);

            //// Populate messages from active thread ////
            axios.get(`/api/message/${reversedData[0]._id}`).then((res) => {
                setActiveMessages(res.data);
            });
        });

        //// TRYING TO SET LOCAL STORAGE BUT GETTING UNDEFINED - WONT LOAD INFO UNTIL PAGE REFRESH ////
        if (localStorage.getItem("userInfo") !== "undefined") {
            setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
        } else {
            console.log("No Token Found");
            throw new Error("No Token Found");
        }
    }, []);

    const logOut = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    const refresh = () => {
        window.location.reload();
    };

    const newMessage = async (e) => {
        e.preventDefault();
        await axios.post("/api/message", {
            content: message,
            chatId: activeChat?._id,
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo?.token}`,
            },
        });

        setMessage("");
    };

    //// This works ////
    const selectChat = async (chat) => {
        setActiveChat(chat);
        const messages = await axios.get(`/api/message/${chat?._id}`);
        setActiveMessages(messages?.data);
    };

    //// This works but doesn't update until page refresh ////
    const addThread = async (e) => {
        e.preventDefault();
        const thread = {
            name: modalInput,
        };
        await axios.post("/api/chat/chat", thread);

        setModalInput("");
        setModalOpen(false);
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

    return (
        <>
            {!userInfo?.token ? (
                <div style={{ position: "absolute", top: "50%", left: "50%" }}>
                    <h1>loading Content</h1>
                    <SpinnerCircular
                        enabled={userInfo?.token}
                        color="rgb(12, 194, 208)"
                    />
                </div>
            ) : (
                <div className="page-wrapper">
                    <h3
                        style={{
                            position: "absolute",
                            top: "-10px",
                            left: "40px",
                        }}
                    >
                        Hello {userInfo?.name}
                    </h3>
                    <IconButton
                        onClick={logOut}
                        style={{ position: "absolute", top: 0, right: "30px" }}
                    >
                        <LogoutIcon />
                    </IconButton>

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
                            {threads &&
                                threads?.map((chat, idx) => {
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
                                            <p
                                                style={{
                                                    padding: "10px",
                                                    color: "white",
                                                }}
                                            >
                                                {chat?.chatName}
                                            </p>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <form className="chat">
                        <div className="chat-header">
                            <h2>{activeChat?.chatName}</h2>
                            <IconButton onClick={refresh}>
                                <RefreshIcon />
                            </IconButton>
                        </div>
                        <div className="chat-body">
                            <ul className="chats">
                                {activeMessages?.map((item, idx) => {
                                    return (
                                        <Chat
                                            key={idx}
                                            sender={item?.sender?.name}
                                            position={
                                                item?.sender?.name ===
                                                userInfo?.name
                                            }
                                            content={item?.content}
                                            timestamp={new Date(
                                                item?.createdAt
                                            ).toLocaleTimeString()}
                                        />
                                    );
                                })}
                            </ul>
                            <ChatBox
                                onChange={(e) => setMessage(e.target.value)}
                                message={message}
                                newMessage={newMessage}
                            />
                            {/* <div className="chat-box">
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
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
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
                            </div> */}
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
