import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import "./ChatBox.css";

export const ChatBox = ({ onChange, message, newMessage }) => {
    return (
        <div className="chat-box">
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
                    onChange={onChange}
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
    );
};
