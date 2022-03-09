
import React from "react";

import { Box, Typography, Button } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material/';

export default function Header() {
    return (
        <Box sx={{ p: 6 }} component="footer">
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                Davi Mury
            </Typography>

            <Typography variant="body2" color="text.secondary" align="center">
                davi.j.mury@gmail.com
            </Typography>

            <Typography sx={{ py: 2 }} variant="body2" align="center">
                <Button variant="text" target="_blank" href='https://www.linkedin.com/in/davi-j-a-mury-14257a18a/'>
                    <LinkedIn />
                </Button>
                <Button variant="text" target="_blank" href='https://github.com/davimury/'>
                    <GitHub />
                </Button>
            </Typography>
        </Box>
    )
}

