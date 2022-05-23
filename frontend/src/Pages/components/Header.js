import React from "react";
import "./Header.css";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

export const Header = ({ logOut, userInfo }) => {
    return (
        <div className="header-wrapper">
            <h3 className="username">Hello {userInfo?.name}</h3>
            <IconButton
                onClick={logOut}
                className="logout"
                style={{ color: "black" }}
            >
                <LogoutIcon />
            </IconButton>
        </div>
    );
};
