import React from "react";
import "./Chatpage.css";
import { ThreadsComp, ChatsComp, Header, LoadingComp } from "./components";
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
