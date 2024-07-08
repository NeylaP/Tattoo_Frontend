import React, { useState } from 'react';
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Login() {

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [errores, setErrores] = useState({});

  const inputHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
    setErrores({
      ...errores,
      [e.target.name]: ''
    });
  }

  const validateField = (key, value) => {
    if (!value) {
      return "This field is required";
    }
    return "";
  }

  const validateData = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(data).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) {
        isValid = false;
        newErrors[key] = error;
      }
    });

    if (!isValid) {
      setErrores(newErrors);
      return;
    }

    console.log("Datos válidos:", data);
  };

  const hasError = (valor) => {
    return !!valor;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper style={{ padding: 10, width: 500 }}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={inputHandler}
                  error={hasError(errores.email)}
                  helperText={errores.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={data.password}
                  onChange={inputHandler}
                  error={hasError(errores.password)}
                  helperText={errores.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Remember me"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={validateData}
            >
              SIGN IN
            </Button>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}