import React from "react";
import { format } from "date-fns";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import { Chat, ChatBox } from "./index";

import "./ChatsComp.css";

export const ChatsComp = ({
    activeChatName,
    refresh,
    activeMessages,
    userInfo,
    setMessage,
    message,
    newMessage,
}) => {
    return (
        <form className="chat">
            <div className="chat-header">
                <h2>{activeChatName?.chatName}</h2>
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
                                        item?.sender?.name === userInfo?.name
                                    }
                                    content={item?.content}
                                    timestamp={format(
                                        new Date(item?.createdAt),
                                        "p"
                                    )}
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
    );
};
