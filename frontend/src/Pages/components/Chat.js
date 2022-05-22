import React from "react";
import "./Chat.css";

export function Chat({ position, sender, content, timestamp }) {
    return (
        <div
            style={
                position
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
                <p className="message-sender">{sender}</p>
                <div
                    className="message"
                    style={
                        position
                            ? {
                                  backgroundColor: "rgb(12, 194, 208)",
                              }
                            : {}
                    }
                >
                    <p className="message-content">{content}</p>
                </div>
                <p className="message-timestamp">{timestamp}</p>
            </div>
        </div>
    );
}
