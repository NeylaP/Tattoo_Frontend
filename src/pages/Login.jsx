import React, { useState } from 'react';
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import authenticationService from "../services/index";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/auth-context/AuthContext';
import { messageBasic } from '../utils/HelperMessages';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

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
      return "Este campo es requerido";
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

    sendData(data);
  };

  const hasError = (valor) => {
    return !!valor;
  }

  const sendData = async (data) => {
    const respToken = await authenticationService.auth.login(data);
    const { resp } = respToken;
    if (resp) {
      if (resp.success) {
        const decoded = jwtDecode(resp.token)
        const userData = {
          token: resp.token,
          decoded: decoded
        }
        login(userData)
        messageBasic(
          "success",
          resp.message,
          "top-end",
          false,
          1600
        );
        navigate('/');
      } else {
        messageBasic(
          "error",
          resp.message
        );
      }
    } else {
      messageBasic(
        "error",
        'Error'
      );
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" paddingTop={15}>
      <Paper elevation={3} style={{ padding: 20, maxWidth: 400, width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: 0,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
            Sign in
          </Typography>
          <Box sx={{ mt: 3, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
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
                  label="Contraseña"
                  type="password"
                  id="password"
                  value={data.password}
                  onChange={inputHandler}
                  error={hasError(errores.password)}
                  helperText={errores.password}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={validateData}
            >
              Iniciar sesión
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
