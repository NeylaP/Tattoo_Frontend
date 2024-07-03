import React from 'react';
import { Box, Button, Paper, TextField } from "@mui/material";
import logo from '../../assets/tatuaje.png'
export default function Login() {

    return ( 
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
            <Paper style={{ padding: 20, width: 300 }}>
            <Box mb={2}>
              <img src={logo} alt="Logo" style={{ width: '100%' }} />
            </Box>
            <form style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField required fullWidth id="email" name="email" autoFocus label="Email" variant="outlined" margin="normal"/>
                <TextField required fullWidth type="password" id="password" name="password" autoFocus label="Password" variant="outlined" margin="normal"/>
                <Button variant="contained" color="inherit" style={{ marginTop: 10 }}>Login</Button>
            </form>
            </Paper>
        </div>
      );
}