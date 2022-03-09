import api from "../services/api";
import React, { useEffect, useState } from "react";

import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
    Box, ImageList, ImageListItem,
    CssBaseline, Container, ImageListItemBar,
    Button, TextField, Grid, InputAdornment,
    CircularProgress
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { BackToTop } from "material-ui-back-to-top"

import Header from '../components/Header'
import Footer from '../components/Footer'
import NotFound from '../components/NotFound'

const theme = createTheme({
    palette: {
        text: { primary: "#2a2a2a" },
        primary: { main: '#ffcb20' },
    },
});

export default function Search() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState({
        loading: true,
        dog_breeds: [],
    });

    useEffect(() => {
        api.get(`/breeds/search?q=${searchParams.get("q")}`)
            .then((breeds) => {
                setState({
                    ...state,
                    dog_breeds: breeds.data,
                    loading: false
                })
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [searchParams.get('q')]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BackToTop size="medium" color="primary" FabProps={{ style: { backgroundColor: '#ffcb20', color: '#2a2a2a' } }} />
            <Header />
            <main>
                <Container sx={{ py: 6 }} maxWidth="md">
                    {state.loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" style={{ minHeight: '65vh' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Container>
                            {state.dog_breeds.length > 0 ? ( // Verifica se o array de raças esta vazio
                                <Container >
                                    <Grid container direction="row" >
                                        <Grid item xs={5}>
                                            <TextField
                                                size="small"
                                                id="outlined-basic"
                                                label="Pesquisar"
                                                variant="outlined"
                                                defaultValue={searchParams.get("q")}
                                                fullWidth
                                                onKeyDown={(e) => {
                                                    if (e.keyCode == 13 && e.target.value)
                                                        navigate(`/search?q=${e.target.value}`, { replace: true });
                                                }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Box display="flex" justifyContent="flex-end" alignItems="center">
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <ImageList variant="masonry" cols={3} gap={8}>
                                        {state.dog_breeds.map((item) => (
                                            <Box key={item.id}>
                                                {item.reference_image_id ? (
                                                    <Link style={{ textDecoration: 'none' }} to={{ pathname: "/breed", search: `?id=${item.id}` }}>
                                                        <ImageListItem key={item.id}>
                                                            <img
                                                                src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`}
                                                                src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`}
                                                                loading="lazy"
                                                                onError={(event) => {
                                                                    event.target.style.display = "none";
                                                                }}
                                                            />
                                                            <ImageListItemBar title={item.name} subtitle={`Expectativa de vida: ${item.life_span.replace('years', 'anos')}`} />
                                                        </ImageListItem>
                                                    </Link>
                                                ) : null}
                                            </Box>
                                        ))}
                                    </ImageList>
                                </Container>
                            ) : <NotFound />}
                        </Container>
                    )}
                </Container>
            </main>
            <Footer />
        </ThemeProvider>
    );
}