import React, { useEffect, useRef, useState } from "react";
import { apiUsers } from "../services";
import Cards from "../components/Cards";
import { messageBasic } from "../utils/HelperMessages";
import tatuador from "../assets/tatuador2.png";
import { Box, Typography} from "@mui/material";

export default function Artistas() {
    const [artistsAll, setArtistsAll] = useState([]);
    const loadServicesExecuted = useRef(false);

    useEffect(() => {
        const loadArtists = async () => {
            try {
                const resp = await apiUsers.user.getArtists();
                console.log(resp);
                setArtistsAll(resp.data);
            } catch (error) {
                messageBasic("error", "Error cargando artistas: " + error);
            }
        };

        if (!loadServicesExecuted.current) {
            loadArtists();
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
                    Artistas
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {artistsAll.map(artist => (
                        <Box key={artist.id} sx={{ m: 2 }}>
                            <Cards
                                image={tatuador}
                                title={`${artist.first_name} ${artist.last_name}`}
                                description="Descripción del artista."
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
