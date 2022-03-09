import api from "../services/api";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Box, Pagination, ImageList, ImageListItem,
    ImageListItemBar, CssBaseline, Container,
    Button, TextField, Grid, InputAdornment,
    CircularProgress
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
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

export default function Home() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState({
        loading: true,
        dog_breeds: [],
        order: 'Asc',
        pageCount: 0,
        currentPage: searchParams.get('page') ? Number(searchParams.get('page')) : 1 // Se não existir a query string curPage setar ele para 1
    });

    function toggleOrderMode() {
        let curOrder = state.order

        if (curOrder == 'Asc') { setState({ ...state, order: 'Desc' }) }
        else if (curOrder == 'Desc') { setState({ ...state, order: 'Asc' }) }
    }

    function updatePageParam(new_page) {
        navigate(`/?page=${new_page}`)
        setState({ ...state, currentPage: new_page, loading: true })
    }

    useEffect(() => {
        api.get(`/breeds?limit=25&page=${state.currentPage - 1}&order=${state.order}`)
            .then((response) => {
                setState({
                    ...state,
                    dog_breeds: response['data'],
                    pageCount: Math.ceil(response['headers']['pagination-count'] / 25),
                    loading: false
                })
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [state.currentPage, state.order]);

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
                                                fullWidth
                                                onKeyDown={(e) => {
                                                    if (e.keyCode == 13 && e.target.value)
                                                        navigate(`/search?q=${e.target.value}`);
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
                                                <SortByAlphaIcon
                                                    style={state.order == 'Asc' ? { color: '#34bedd ' } : {}}
                                                    onClick={() => toggleOrderMode()} />
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <ImageList variant="masonry" cols={3} gap={8}>
                                        {state.dog_breeds.map((item) => (
                                            <Link key={item.id} style={{ textDecoration: 'none' }} to={{ pathname: "/breed", search: `?id=${item.id}` }}>
                                                <ImageListItem key={item.id}>

                                                    <img
                                                        width={item.image.width}
                                                        height={item.image.height}
                                                        src={item.image.url}
                                                        srcSet={item.image.url}
                                                        loading="lazy"
                                                    />
                                                    <ImageListItemBar title={item.name} subtitle={`Expectativa de vida: ${item.life_span.replace('years', 'anos')}`} />

                                                </ImageListItem>
                                            </Link>
                                        ))}
                                    </ImageList>

                                    <Pagination
                                        style={{ display: 'flex', justifyContent: 'center' }}
                                        sx={{ pt: 6 }}
                                        page={state.currentPage}
                                        count={state.pageCount}
                                        onChange={(event, page) => updatePageParam(page)}
                                        color="primary"
                                    />
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