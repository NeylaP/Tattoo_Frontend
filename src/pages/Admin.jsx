import React, { useEffect, useRef, useState } from "react";
import { apiUsers } from "../services";
import { messageBasic } from "../utils/HelperMessages";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useAuth } from "../context/auth-context/AuthContext";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Swal from "sweetalert2";

export default function Admin() {
    const [allUsers, setAllUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const loadUsersExecuted = useRef(false);
    const [token, setToken] = useState('');
    const [load, setLoad] = useState(false);
    const [open, setOpen] = useState(false);
    const [roleId, setRoleId] = useState(null);
    const [userSelected, setUserSelected] = useState({});
    const { userData } = useAuth();
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData) {
            navigate("/login");
            return;
        }

        const token = userData.token;
        setToken(token);
        const loadUsers = async () => {
            try {
                const resp = await apiUsers.user.userAll(token);
                setAllUsers(resp.data);
            } catch (error) {
                messageBasic("error", "Error cargando users: " + error);
            }
        };

        if (!loadUsersExecuted.current) {
            loadUsers();
            loadUsersExecuted.current = true;
        }
    }, [load]);
    const loadRoles = async () => {
        try {
            const resp = await apiUsers.user.rolesAll(token);
            setRoles(resp.data);
        } catch (error) {
            messageBasic("error", "Error cargando roles: " + error);
        }
    };
    const handleDelete = async (user) => {
        try {
            Swal.fire({
                title: `Are you sure you want to eliminate ${user.first_name} ${user.last_name}?`,
                showCancelButton: true,
                confirmButtonText: "Accept"
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteUser(user.id);
                }
            });
        } catch (error) {
            messageBasic("error", "Error al eliminar usuario: " + error);
        }
    };
    
    const handleEditRole = async (user) => {
        loadRoles();
        setUserSelected(user);
        setRoleId(user.role.id);
        setOpen(true);
    };

    const deleteUser = async (id) => {
        const resp = await apiUsers.user.deleteUser(token, id);
        if (resp.success) {
            messageBasic(
                "success",
                resp.message,
                "center",
                false,
                1600
            );
            loadUsersExecuted.current = false;
            setLoad(!load);
        } else {
            messageBasic("error", "Error al eliminar usuario: " + error);
        }
    }
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setRoleId(value);
    };
    const validateData = () => {
        if(userSelected.role.id === roleId) {
            messageBasic(
                "warning",
                'You must select a different role than the one you have already assigned.',
                "center",
                true,
                false
            );
        }else{
            save();
        }
    }
    const save = async () => {
        try {
            const user_id = userSelected.id;
            const resp = await apiUsers.user.editRole(token, user_id, roleId);
            if (resp.success) {
                setOpen(!open);
                messageBasic(
                    "success",
                    resp.message,
                    "center",
                    false,
                    1600
                );
                if(userData.decoded.userId === userSelected.id){
                    logout();
                }
                loadUsersExecuted.current = false;
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
                        Users
                    </Typography>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={allUsers}
                            columns={[
                                {
                                    field: 'full_name',
                                    headerName: 'Name',
                                    sortable: false,
                                    width: 300,
                                    valueGetter: (value, row) => `${row.first_name} ${row.last_name}`,
                                },
                                {
                                    field: 'email',
                                    headerName: 'Email',
                                    width: 300
                                },
                                {
                                    field: 'role',
                                    headerName: 'Role',
                                    sortable: false,
                                    width: 300,
                                    valueGetter: (value, row) => `${row.role.name}`,
                                },
                                {
                                    field: 'accion',
                                    headerName: '',
                                    sortable: false,
                                    width: 150,
                                    renderCell: (params) => (
                                        <>
                                            <Button
                                                color="error"
                                                size="small"
                                                onClick={() => handleDelete(params.row)}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                            <Button
                                                size="small"
                                                onClick={() => handleEditRole(params.row)}
                                            >
                                                <ManageAccountsIcon />
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
                maxWidth="md"
                sx={{ '& .MuiDialog-paper': { width: '50%', maxWidth: '600px' } }}
            >
    <DialogTitle
        sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        id="customized-dialog-title"
    >
        Edit User
        <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
                color: (theme) => theme.palette.grey[500],
            }}
        >
            <CloseIcon />
        </IconButton>
    </DialogTitle>
                <DialogContent dividers>
                    <Box noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <FormControl sx={{ m: 0, width: '100%' }}>
                                    <InputLabel id="role_label">Role</InputLabel>
                                    <Select
                                        required
                                        labelId="role_label"
                                        id="role_id"
                                        name="role_id"
                                        value={roleId}
                                        label="Role"
                                        onChange={inputHandler}
                                    >
                                        <MenuItem value="">
                                            <em>Select Role</em>
                                        </MenuItem>
                                        {roles.map((role) => (
                                            <MenuItem
                                                key={role.id}
                                                value={role.id}
                                            >
                                                {role.name}
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