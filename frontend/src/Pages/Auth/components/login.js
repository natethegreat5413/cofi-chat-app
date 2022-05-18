import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import cofi from "../../../public/cofi.jpg";
import "./login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Login(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async () => {
        setLoading(true);

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
            setLoading(false);
            navigate("/chats");
        } catch (error) {
            throw new Error("Could not Login", error);
        }
    };

    return (
        <form className="login-container">
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
                />
                <Space />
                {loading === false && (
                    <Button onClick={submitHandler} variant="outlined">
                        Login
                    </Button>
                )}
                {/* {loading === true && (
                    <LoadingButton loading variant="outlined">
                        Login
                    </LoadingButton>
                )} */}
            </Paper>
        </form>
    );
}

const Space = () => <div style={{ height: "1rem" }} />;
