import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useChatHook = () => {
    const [threads, setThreads] = useState();
    const [message, setMessage] = useState("");
    const [activeChat, setActiveChat] = useState();
    const [activeMessages, setActiveMessages] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalInput, setModalInput] = useState("");
    const [userInfo, setUserInfo] = useState();
    const navigate = useNavigate();

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const fetchChatsAndMessages = () => {
        axios.get("/api/chat").then((res) => {
            const reversedData = res.data.reverse();
            setThreads(reversedData);
            setActiveChat(reversedData[0]);

            axios.get(`/api/message/${reversedData[0]._id}`).then((res) => {
                setActiveMessages(res.data);
            });
        });
    };

    useEffect(() => {
        fetchChatsAndMessages();

        if (localStorage.getItem("userInfo") !== "undefined") {
            setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
        } else {
            throw new Error("No Token Found");
        }
    }, []);

    const logOut = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    const refresh = () => {
        fetchChatsAndMessages();
    };

    const newMessage = async (e) => {
        e.preventDefault();
        await axios
            .post("/api/message", {
                content: message,
                chatId: activeChat?._id,
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo?.token}`,
                },
            })
            .then((res) => {
                setActiveMessages((state) => [...state, res.data]);
            })
            .catch((error) => {
                console.log("error", error);
            });

        setMessage("");
    };

    const selectChat = async (chat) => {
        setActiveChat(chat);
        const messages = await axios.get(`/api/message/${chat?._id}`);
        setActiveMessages(messages?.data);
    };

    const addThread = async (e) => {
        e.preventDefault();
        const thread = {
            name: modalInput,
        };
        await axios
            .post("/api/chat/chat", thread)
            .then((res) => {
                setThreads((state) => [res.data, ...state]);
            })
            .catch((error) => console.log("error", error));

        setModalInput("");
        setModalOpen(false);
    };

    return {
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
    };
};
