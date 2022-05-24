import React from "react";
import "./Chatpage.css";
import { ThreadsComp, ChatsComp, Header, LoadingComp } from "./components";
import { useChatHook } from "../hooks/useChatHook";

export function Chatpage() {
    const {
        threads,
        message,
        userInfo,
        modalOpen,
        activeChat,
        modalInput,
        activeMessages,
        logOut,
        refresh,
        addThread,
        setMessage,
        newMessage,
        handleOpen,
        selectChat,
        handleClose,
        setModalInput,
    } = useChatHook();

    return (
        <>
            {!userInfo?.token ? (
                <LoadingComp userInfo={userInfo} />
            ) : (
                <div className="page-wrapper">
                    <Header userInfo={userInfo} logOut={logOut} />
                    <div className="main-content-wrapper">
                        <ThreadsComp
                            handleOpen={handleOpen}
                            handleClose={handleClose}
                            modalOpen={modalOpen}
                            modalInput={modalInput}
                            onChange={(e) => setModalInput(e.target.value)}
                            addThread={addThread}
                            threads={threads}
                            selectChat={selectChat}
                        />
                        <ChatsComp
                            activeChatName={activeChat}
                            refresh={refresh}
                            activeMessages={activeMessages}
                            userInfo={userInfo}
                            setMessage={setMessage}
                            message={message}
                            newMessage={newMessage}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
