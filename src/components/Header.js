
import React from "react";

import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Header() {
    const navigate = useNavigate();

    return (
        <AppBar position="relative">
            <Toolbar >
                <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <ArrowBackIosIcon onClick={() => { navigate(-1) }} sx={{ cursor: 'pointer', justifyContent: 'flex-start' }} />
                    <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box style={{ display: 'contents', cursor: 'pointer' }} onClick={() => navigate('/?page=1')}>
                            <img src="./logo.png" alt="logo" width={85} />
                            <Typography sx={{ color: 'text.primary' }} variant="h5" noWrap>DogePedia</Typography>
                        </Box>
                    </Container>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

