import React, { useState } from "react";
import cofi from "../../../public/cofi.jpg";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export function Login(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [error, setError] = useState();
    let navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/chats");
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(true);
                setErrorMessage(error.response.data.message);
            }
        }
    };

    return (
        <form className="login-container">
            <Paper elevation={3} className="login-paper">
                <img src={cofi} height={75} width={75} />
                <h2>Login</h2>
                <p>
                    Don't have an account? Register
                    <Button onClick={props.toggle}>Here</Button>
                </p>
                <TextField
                    required={true}
                    size="small"
                    className="input"
                    fullWidth
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error}
                />
                <Space />
                <TextField
                    required={true}
                    size="small"
                    className="input"
                    type="password"
                    fullWidth
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={error}
                />
                <Space />
                <Button onClick={submitHandler} variant="outlined">
                    Login
                </Button>
                {error && <p className="error">{errorMessage}</p>}
            </Paper>
        </form>
    );
}

const Space = () => <div style={{ height: "1rem" }} />;
