import React from "react";
import "./Chatpage.css";
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
        message,
        setMessage,
        activeChat,
        activeMessages,
        modalOpen,
        modalInput,
        setModalInput,
        userInfo,
        handleOpen,
        handleClose,
        logOut,
        refresh,
        newMessage,
        selectChat,
        addThread,
    } = useChatHook();

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
                    <div className="header-wrapper">
                        <h3 className="username">Hello {userInfo?.name}</h3>
                        <IconButton
                            onClick={logOut}
                            className="logout"
                            style={{ color: "black" }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </div>
                    <div className="main-content-wrapper">
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
                                    onChange={(e) =>
                                        setModalInput(e.target.value)
                                    }
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
                                    {activeMessages &&
                                        activeMessages?.map((item, idx) => {
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
                </div>
            )}
        </>
    );
}
