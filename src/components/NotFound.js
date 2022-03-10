


import React from "react";
import { Button, Container } from '@mui/material';

export default function NotFound() {
    return (
        <Container >
            <img src="./404.gif" style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }} />
            <Button style={{ width: 200, display: 'flex', justifyContent: 'center', margin: 'auto' }} href="/?page=1" variant="contained">Voltar para Home</Button>
        </Container>
    )
}



