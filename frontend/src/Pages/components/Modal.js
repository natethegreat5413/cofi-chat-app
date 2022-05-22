import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export const ThreadModal = ({
    modalOpen,
    handleClose,
    modalInput,
    onChange,
    addThread,
}) => {
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal open={modalOpen} onClose={handleClose}>
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add a new thread
                </Typography>
                <div style={{ display: "flex" }}>
                    <TextField
                        value={modalInput}
                        placeholder="New Thread"
                        onChange={onChange}
                        fullWidth
                        size="small"
                    ></TextField>
                    <Button
                        onClick={addThread}
                        style={{ marginLeft: "1rem" }}
                        variant="contained"
                        endIcon={<AddIcon />}
                    >
                        Add
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};
