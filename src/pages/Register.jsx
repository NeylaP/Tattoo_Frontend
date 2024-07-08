import React, { useState } from 'react';
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import authenticationService from "../services/index";

export default function Register() {

    const [data, setData] = useState({
        email: '',
        password: '',
        passwordRepeat: '',
        first_name: '',
        last_name: '',
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

    const validateField = (fieldName, value) => {
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

        if (data.password !== data.passwordRepeat) {
            setErrores((prevErrores) => ({
                ...prevErrores,
                passwordRepeat: "Las contraseñas no coinciden"
            }));
            return;
        }
       sendData();
    };

    const hasError = (valor) => {
        return !!valor;
    }

    // const sendData = () => {
    //     consulta(
    //       `/sisef`,
    //       {},
    //       "post",
    //       (error, estado, resp) => {
    //         console.log("Hola");
    //       }
    //     );
    //   };

    const sendData = async () => {
        const resp = await authenticationService.auth.register(data);
        console.log(resp);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
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
                        Sign up
                    </Typography>
                    <Box noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="first_name"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="First Name"
                                    value={data.first_name}
                                    onChange={inputHandler}
                                    autoFocus
                                    error={hasError(errores.first_name)}
                                    helperText={errores.first_name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="last_name"
                                    label="Last Name"
                                    name="last_name"
                                    autoComplete="family-name"
                                    value={data.last_name}
                                    onChange={inputHandler}
                                    error={hasError(errores.last_name)}
                                    helperText={errores.last_name}
                                />
                            </Grid>
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
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={inputHandler}
                                    error={hasError(errores.password)}
                                    helperText={errores.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordRepeat"
                                    label="Repeat password"
                                    type="password"
                                    id="passwordRepeat"
                                    value={data.passwordRepeat}
                                    onChange={inputHandler}
                                    error={hasError(errores.passwordRepeat)}
                                    helperText={errores.passwordRepeat}
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
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}
