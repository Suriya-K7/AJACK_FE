import React, { useContext, useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import DataContext from "../context/DataContent";

function ToastMessage() {

    const { open, handleClose, message, type } = useContext(DataContext);

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}  // Toast will disappear after 3 seconds
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}  // Position the toast
        >
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default ToastMessage;
