import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Chatpage.css";
import { useNavigate } from "react-router-dom";
import { Chat, ChatBox, Threads, ThreadModal } from "./components";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import LogoutIcon from "@mui/icons-material/Logout";
import { SpinnerCircular } from "spinners-react";
import { useChatHook } from "../hooks/useChatHook";

export function Chatpage() {
    const {
        threads,
        setThreads,
        message,
        setMessage,
        activeChat,
        setActiveChat,
        activeMessages,
        setActiveMessages,
        modalOpen,
        setModalOpen,
        modalInput,
        setModalInput,
        userInfo,
        setUserInfo,
        navigate,
        handleOpen,
        handleClose,
        logOut,
        refresh,
        newMessage,
        selectChat,
        addThread,
    } = useChatHook();
    // const [threads, setThreads] = useState();
    // const [message, setMessage] = useState("");
    // const [activeChat, setActiveChat] = useState();
    // const [activeMessages, setActiveMessages] = useState();
    // const [modalOpen, setModalOpen] = useState(false);
    // const [modalInput, setModalInput] = useState("");
    // const [userInfo, setUserInfo] = useState();
    // const navigate = useNavigate();

    // const handleOpen = () => setModalOpen(true);
    // const handleClose = () => setModalOpen(false);

    // useEffect(() => {
    //     //// FETCH CHATS ////
    //     axios.get("/api/chat").then((res) => {
    //         const reversedData = res.data.reverse();
    //         setThreads(reversedData);
    //         setActiveChat(reversedData[0]);

    //         //// Populate messages from active thread ////
    //         axios.get(`/api/message/${reversedData[0]._id}`).then((res) => {
    //             setActiveMessages(res.data);
    //         });
    //     });

    //     if (localStorage.getItem("userInfo") !== "undefined") {
    //         setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    //     } else {
    //         console.log("No Token Found");
    //         throw new Error("No Token Found");
    //     }
    // }, []);

    // const logOut = () => {
    //     localStorage.removeItem("userInfo");
    //     navigate("/");
    // };

    // const refresh = () => {
    //     window.location.reload();
    // };

    // const newMessage = async (e) => {
    //     e.preventDefault();
    //     await axios.post("/api/message", {
    //         content: message,
    //         chatId: activeChat?._id,
    //         headers: {
    //             "Content-type": "application/json",
    //             Authorization: `Bearer ${userInfo?.token}`,
    //         },
    //     });

    //     setMessage("");
    // };

    // //// This works ////
    // const selectChat = async (chat) => {
    //     setActiveChat(chat);
    //     const messages = await axios.get(`/api/message/${chat?._id}`);
    //     setActiveMessages(messages?.data);
    // };

    // //// This works but doesn't update until page refresh ////
    // const addThread = async (e) => {
    //     e.preventDefault();
    //     const thread = {
    //         name: modalInput,
    //     };
    //     await axios.post("/api/chat/chat", thread);

    //     setModalInput("");
    //     setModalOpen(false);
    // };

    return (
        <>
            {!userInfo?.token ? (
                <div className="loading">
                    <h1>loading Content</h1>
                    <SpinnerCircular
                        enabled={userInfo?.token}
                        color="rgb(12, 194, 208)"
                    />
                </div>
            ) : (
                <div className="page-wrapper">
                    <h3 className="username">Hello {userInfo?.name}</h3>
                    <IconButton
                        onClick={logOut}
                        className="logout"
                        style={{ position: "absolute" }}
                    >
                        <LogoutIcon />
                    </IconButton>

                    <div className="threads">
                        <div className="threads-header">
                            <h2>Chats</h2>
                            <IconButton onClick={handleOpen}>
                                <AddIcon />
                            </IconButton>
                            <ThreadModal
                                modalOpen={modalOpen}
                                handleClose={handleClose}
                                modalInput={modalInput}
                                onChange={(e) => setModalInput(e.target.value)}
                                addThread={addThread}
                            />
                        </div>
                        <div className="threads-body">
                            {threads &&
                                threads?.map((chat, idx) => {
                                    return (
                                        <Threads
                                            key={idx}
                                            onClick={() => selectChat(chat)}
                                            chatName={chat?.chatName}
                                        />
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
                            <div className="chats">
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
                            </div>
                            <ChatBox
                                onChange={(e) => setMessage(e.target.value)}
                                message={message}
                                newMessage={newMessage}
                            />
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
