import React, { useEffect, useRef, useState } from "react";
import { apiServices } from "../services";
import { messageBasic } from "../utils/HelperMessages";
import { Box, Grid, Typography } from "@mui/material";
import Cards from "../components/Cards";
import tatuaje from "../assets/tatuaje.png";

export default function Services() {
    const [servicesAll, setServicesAll] = useState([]);
    const loadServicesExecuted = useRef(false);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const resp = await apiServices.service.getServices();
                setServicesAll(resp.data);
            } catch (error) {
                messageBasic("error", "Error cargando servicios: " + error);
            }
        };

        if (!loadServicesExecuted.current) {
            loadServices();
            loadServicesExecuted.current = true;
        }
    }, []);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" pt={15}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pb: 0,
                }}
            >
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                    Servicios
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Grid item xs={12} md={12}>
                        {servicesAll.map(service => (
                            <Box key={service.id} sx={{ m: 2 }}>
                                <Grid item xs={6} md={6}>
                                    <Cards
                                        image=''
                                        title={`${service.service_name}`}
                                        description={`${service.description}`}
                                    />
                                </Grid>
                            </Box>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}