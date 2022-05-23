import React from "react";
import { Threads, ThreadModal } from "./";
import "./ThreadsComp.css";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

export const ThreadsComp = ({
    addThread,
    modalInput,
    handleClose,
    modalOpen,
    handleOpen,
    onChange,
    threads,
    selectChat,
}) => {
    return (
        <div className="threads-wrapper">
            <div className="threads-header">
                <h2>Chats</h2>
                <IconButton onClick={handleOpen}>
                    <AddIcon />
                </IconButton>
                <ThreadModal
                    modalOpen={modalOpen}
                    handleClose={handleClose}
                    modalInput={modalInput}
                    onChange={onChange}
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
    );
};
