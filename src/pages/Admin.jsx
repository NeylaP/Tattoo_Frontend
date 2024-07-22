import React, { useEffect, useRef, useState } from "react";
import { apiUsers } from "../services";
import { messageBasic } from "../utils/HelperMessages";
import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../context/auth-context/AuthContext";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";

export default function Admin() {
    const [allUsers, setAllUsers] = useState([]);
    const loadUsersExecuted = useRef(false);
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
        const loadUsers = async () => {
            try {
                const resp = await apiUsers.user.userAll(token);
                setAllUsers(resp.data);
            } catch (error) {
                messageBasic("error", "Error cargando citas: " + error);
            }
        };

        if (!loadUsersExecuted.current) {
            loadUsers();
            loadUsersExecuted.current = true;
        }
    }, [load]);

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
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDelete(params.row)}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </>),
                                },
                            ]}
                            pageSize={5}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
}