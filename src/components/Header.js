
import React from "react";

import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { useNavigate, Link } from "react-router-dom";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Header() {
    const navigate = useNavigate();

    return (
        <AppBar position="relative">
            <Toolbar >
                <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <ArrowBackIosIcon onClick={() => { navigate(-1) }} sx={{ cursor: 'pointer', justifyContent: 'flex-start' }} />
                    <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Link style={{ textDecoration: 'none', display: 'contents' }} to={{ pathname: "/", search: "?page=1" }} >
                            <img src="/logo.png" alt="logo" width={85} />
                            <Typography sx={{ color: 'text.primary' }} variant="h5" noWrap>DogePedia</Typography>
                        </Link>
                    </Container>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

