import React from 'react';
import { Box, Button, Paper, TextField } from "@mui/material";
import logo from '../../assets/tatuaje.png'
export default function Register() {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
            <Paper style={{ padding: 10, width: 500 }}>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '20px',
                          }}
                    >
                            <TextField
                                id="first_name"
                                label="First name"
                                fullWidth
                            />
                            <TextField
                                id="last_name"
                                label="Last name"
                                fullWidth
                            />
                            <TextField
                                id="email"
                                label="email"
                                fullWidth
                            />
                            <TextField
                                id=""
                                label="passwort"
                                type='password'
                                fullWidth
                            />
                    </Box>
            </Paper>
        </div>
    );
}