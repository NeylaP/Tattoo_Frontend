import React, { useEffect, useRef, useState } from "react";
import { apiCitas, apiServices, apiUsers } from "../services";
import { messageBasic } from "../utils/HelperMessages";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useAuth } from "../context/auth-context/AuthContext";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';

export default function Citas() {
    const [misCitas, setMisCitas] = useState([]);
    const loadCitasExecuted = useRef(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('New Appointment');
    const [data, setData] = useState({
        id: null,
        appointment_date: '',
        service_id: null,
        tattoo_artist_id: null,
    });
    const [errores, setErrores] = useState({});
    const [services, setServices] = useState([]);
    const [artists, setArtists] = useState([]);
    const [token, setToken] = useState('');
    const [load, setLoad] = useState(false);

    const { userData } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData) {
            navigate("/login");
            return;
        }

        const token = userData.token;
        setToken(token);
        const loadCitas = async () => {
            try {
                const resp = await apiCitas.cita.misCitas(token);
                setMisCitas(resp.data);
            } catch (error) {
                messageBasic("error", "Error cargando citas: " + error);
            }
        };

        if (!loadCitasExecuted.current) {
            loadCitas();
            loadCitasExecuted.current = true;
        }
    }, [load]);

    const handleAddCita = async () => {
        try {
            await loadData();
            setTitle('New Appointment');
            setData({
                id: null,
                appointment_date: '',
                service_id: null,
                tattoo_artist_id: null,
            });
            setErrores({});
            setOpen(!open);
        } catch (error) {
            messageBasic("error", "Error al cargar servicios y artistas: " + error);
        }
    };

    const handleEdit = async (id) => {
        try {
            await loadData();
            const resp = await apiCitas.cita.getCita(token, id);
            if(resp.success){
                setData({
                    id: id,
                    appointment_date: format(resp.data.appointment_date, 'yyyy-MM-dd'),
                    service_id: resp.data.services.id,
                    tattoo_artist_id: (resp.data.tattoo_artists && resp.data.tattoo_artists.id) ? resp.data.tattoo_artists.id : null,
                });
                setTitle('Edit Appointment');
                setOpen(!open);
            }
        } catch (error) {
            messageBasic("error", "Error al cargar cita: " + error);
        }
    };

    const loadData = async () => {
        try {
            const servicesResp = await apiServices.service.getServices();
            setServices(servicesResp.data);

            const artistsResp = await apiUsers.user.getArtists();
            setArtists(artistsResp.data);
        } catch (error) {
            messageBasic("error", "Error al cargar servicios y artistas: " + error);
        }
    };

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        setErrores({ ...errores, [name]: '' });
    };

    const validateField = (fieldName, value) => {
        let error = "";
        switch (fieldName) {
            case "appointment_date":
                if (!value) {
                    error = "Date is required";
                } else {
                    const selectedDate = new Date(value);
                    const currentDate = new Date();
                    if (selectedDate <= currentDate) {
                        error = "Date must be in the future";
                    }
                }
                break;
            case "service_id":
                if (value === null || value === "") {
                    error = "Please select a service";
                }
                break;
            default:
                break;
        }
        return error;
    };

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
        } else {
            save();
            setErrores({});
        }
    };

    const save = async () => {
        try {
            let resp = null;
            if (data.id == null ) {
                resp = await apiCitas.cita.addCita(token, data);
            } else {
                resp = await apiCitas.cita.updateCita(token, data);
            }
            if (resp.success) {
                setOpen(!open);
                messageBasic(
                    "success",
                    resp.message,
                    "center",
                    false,
                    1600
                );
                loadCitasExecuted.current = false;
                setLoad(!load);
            } else {
                setOpen(!open);
                messageBasic("error", resp.message);
            }
        } catch (error) {
            setOpen(!open);
            messageBasic("error", error.message);
        }
    };
    const hasError = (fieldName) => {
        return !!errores[fieldName];
    };

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" pt={15}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pb: 0,
                        width: '80%'
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                        My Appointments
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'justify-end', alignItems: 'center', mb: 3, width: '100%' }}>
                        <Button variant="contained" onClick={handleAddCita}>Add appointment</Button>
                    </Box>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={misCitas}
                            columns={[
                                {
                                    field: 'appointment_date',
                                    headerName: 'Date',
                                    width: 150,
                                    editable: true,
                                    valueGetter: (value, row) => `${format(value, 'dd-MM-yyyy')}`,
                                },
                                {
                                    field: 'service',
                                    headerName: 'Service',
                                    width: 300,
                                    valueGetter: (value, row) => `${row.services.service_name}`,
                                },
                                {
                                    field: 'description',
                                    headerName: 'Description',
                                    width: 300,
                                    valueGetter: (value, row) => `${row.services.description}`,
                                },
                                {
                                    field: 'artist',
                                    headerName: 'Artist',
                                    sortable: false,
                                    width: 200,
                                    valueGetter: (value, row) => (row.tattoo_artists === null) ? 'No Seleccionado' : `${row.tattoo_artists.first_name} ${row.tattoo_artists.last_name || ''}`,
                                },
                                {
                                    field: 'accion',
                                    headerName: '',
                                    sortable: false,
                                    width: 150,
                                    renderCell: (params) => (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={() => handleEdit(params.row.id)} 
                                            >
                                                <EditIcon/>
                                            </Button>
                                        </>),
                                },
                            ]}
                            pageSize={5}
                        />
                    </Box>
                </Box>
            </Box>
            <Dialog
                onClose={() => setOpen(false)}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth={'xs'}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {title}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpen(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Box noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    type="date"
                                    autoComplete="off"
                                    name="appointment_date"
                                    required
                                    fullWidth
                                    id="appointment_date"
                                    label="Date"
                                    placeholder="Select date"
                                    value={data.appointment_date}
                                    onChange={inputHandler}
                                    error={hasError("appointment_date")}
                                    helperText={errores.appointment_date}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl sx={{ m: 0, width: '100%' }} error={hasError("service_id")}
                                    helperText={errores.service_id}>
                                    <InputLabel id="service_label">Service</InputLabel>
                                    <Select
                                        required
                                        labelId="service_label"
                                        id="service_id"
                                        name="service_id"
                                        value={data.service_id}
                                        label="Service"
                                        onChange={inputHandler}
                                    >
                                        <MenuItem value="">
                                            <em>Select Service</em>
                                        </MenuItem>
                                        {services.map((service) => (
                                            <MenuItem
                                                key={service.id}
                                                value={service.id}
                                            >
                                                {service.service_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {hasError("service_id") && <FormHelperText>{errores.service_id}</FormHelperText>}
                                </FormControl>

                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl sx={{ m: 0, width: '100%' }}>
                                    <InputLabel id="artist_label">Artist</InputLabel>
                                    <Select
                                        labelId="artist_label"
                                        id="tattoo_artist_id"
                                        name="tattoo_artist_id"
                                        value={data.tattoo_artist_id}
                                        label="Artist"
                                        onChange={inputHandler}
                                    >
                                        <MenuItem value="">
                                            <em>Select Artist</em>
                                        </MenuItem>
                                        {artists.map((artist) => (
                                            <MenuItem
                                                key={artist.id}
                                                value={artist.id}
                                            >
                                                {artist.first_name} {artist.last_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={validateData}>
                        Save
                    </Button>
                    <Button color="error" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}