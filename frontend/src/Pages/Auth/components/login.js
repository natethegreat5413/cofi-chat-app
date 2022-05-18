import React from "react";
import Paper from "@mui/material/Paper";
import cofi from "../../../public/cofi.jpg";
import "./login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export function Login() {
    const onSubmit = (data) => console.log(data);

    return (
        <form className="login-container" onSubmit={onSubmit}>
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
                    Don't have an account? Register <a href="#">Here</a>
                </p>
                <TextField
                    size="small"
                    className="input"
                    fullWidth
                    type="email"
                    label="Email"
                />
                <TextField
                    size="small"
                    className="input"
                    type="password"
                    fullWidth
                    label="Password"
                />
                <Button variant="outlined">Create Account</Button>
            </Paper>
        </form>
    );
}
