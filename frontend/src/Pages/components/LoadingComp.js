import React from "react";
import "./LoadingComp.css";
import { SpinnerCircular } from "spinners-react";

export const LoadingComp = ({ userInfo }) => {
    return (
        <div className="loading">
            <h1>Loading Content</h1>
            <SpinnerCircular
                enabled={userInfo?.token}
                color="rgb(12, 194, 208)"
            />
        </div>
    );
};
