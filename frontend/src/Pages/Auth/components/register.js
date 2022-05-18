import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import cofi from "../../../public/cofi.jpg";
import "./register.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export function Register(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onSubmit = (data) => console.log(data);

    return (
        <form className="register-container" onSubmit={onSubmit}>
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
                    Already have an account?{" "}
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
                <TextField
                    required={true}
                    size="small"
                    className="input"
                    type="password"
                    fullWidth
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Space />
                <Button type="submit" variant="outlined">
                    Create Account
                </Button>
            </Paper>
        </form>
    );
}

const Space = () => <div style={{ height: "1rem" }} />;
