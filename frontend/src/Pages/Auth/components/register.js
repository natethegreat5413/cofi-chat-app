import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import cofi from "../../../public/cofi.jpg";
import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";

export function Register(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [errorMessage, setErrorMessage] = useState();
    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/register",
                { name, email, password },
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
        <form className="register-container">
            <Paper
                elevation={3}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    padding: "2rem",
                }}
            >
                <img src={cofi} height={75} width={75} />
                <h2>Register</h2>
                <p>
                    Already have an account?
                    <Button variant="text" onClick={props.toggle}>
                        Login
                    </Button>
                </p>
                <TextField
                    required={true}
                    label="Name"
                    size="small"
                    className="input"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={error}
                />
                <Space />
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
                <TextField
                    required={true}
                    size="small"
                    className="input"
                    type="password"
                    fullWidth
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={error}
                />
                {error && <p style={{ color: "red" }}>{errorMessage}</p>}
                <Space />
                {loading === false && (
                    <Button onClick={onSubmit} variant="outlined">
                        Create Account
                    </Button>
                )}
                {loading === true && (
                    <LoadingButton loading variatn="outlined">
                        Create Account
                    </LoadingButton>
                )}
            </Paper>
        </form>
    );
}

const Space = () => <div style={{ height: "1rem" }} />;
