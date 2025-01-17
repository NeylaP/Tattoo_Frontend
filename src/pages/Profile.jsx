import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { apiUsers } from "../services/index";
import { useNavigate } from 'react-router-dom';
import { messageBasic } from "../utils/HelperMessages";
import { useAuth } from '../context/auth-context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Profile() {
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });
    const [token, setToken] = useState('');
    const loadServicesExecuted = useRef(false);
    const { userData } = useAuth();
    const navigate = useNavigate();
    const [errores, setErrores] = useState({});
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (!userData) {
            navigate("/login");
            return;
        }

        const token = userData.token;
        setToken(token);

        const loadProfile = async () => {
            try {
                const resp = await apiUsers.user.getProfile(token);
                setData(resp.data);
            } catch (error) {
                messageBasic("error", "Error cargando profile: " + error);
            }
        };

        if (!loadServicesExecuted.current) {
            loadProfile();
            loadServicesExecuted.current = true;
        }
    }, [load]);

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

        sendData(data);
    };

    const sendData = async () => {
        const resp = await apiUsers.user.updateProfile(token, data);
        if (resp.success) {
            messageBasic(
                "success",
                resp.message,
                "center",
                false,
                1600
            );
            setLoad(!load);
        }
    }
    const hasError = (valor) => {
        return !!valor;
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
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Profile
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
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={validateData}
                        >
                            Update Profile
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}
