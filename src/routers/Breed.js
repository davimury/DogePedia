import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Box, CssBaseline, Container,
  Grid, Paper, ListItem, ListItemIcon,
  List, ListSubheader, CircularProgress,
  ListItemText, Button
} from '@mui/material';

import {
  Pets, Height, Scale,
  Favorite, Settings, Thermostat
} from '@mui/icons-material';

import api from "../services/api";

import Header from '../components/Header'
import Footer from '../components/Footer'
import NotFound from '../components/NotFound'

import Carousel from 'react-material-ui-carousel'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    text: { primary: "#2a2a2a" },
    primary: { main: '#ffcb20' },
  },
});

export default function Breed() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState({
    loading: true,
    dogsData: [],
  });

  const breedId = searchParams.get('id')

  useEffect(() => {
    api.get(`/images/search?breed_id=${breedId}&limit=25`)
      .then((response) => {
        setState({
          ...state,
          loading: false,
          dogsData: response.data,
        })
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [breedId]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Container sx={{ py: 6 }} maxWidth="md">
          {state.loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" style={{ minHeight: '65vh' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Container >
              {state.dogsData.length > 0 ? (
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Carousel
                      animation="slide"
                      indicators={false}
                      fullHeightHover={true}
                    >
                      {state.dogsData.map((item, i) =>
                        <Box
                          key={item.id}
                          height={600}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <img
                            width={item.width}
                            height={item.height}
                            src={item.url}
                            srcSet={item.url}
                            loading="lazy"
                            style={{
                              height: '100%',
                              maxHeight: '600px',
                              width: '100%',
                              maxWidth: '800px',
                              objectFit: 'cover',
                              objectPosition: 'top',
                              borderRadius: 5,
                              display: 'flex',
                              alignItems: "center",
                            }}
                          />
                        </Box>
                      )}
                    </Carousel>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper elevation={1} style={{ height: '100%', width: '100%' }}>
                      <List
                        dense={true}
                        sx={{ width: '100%', maxWidth: 360 }}
                        subheader={<ListSubheader>Informações</ListSubheader>}
                      >
                        {state.dogsData[0].breeds[0].name ? (
                          <ListItem>
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                              <Pets />
                            </ListItemIcon>
                            <ListItemText
                              primary={state.dogsData[0] ? (state.dogsData[0].breeds[0].name) : ('')}
                              secondary="Raça"
                            />
                          </ListItem>
                        ) : null}

                        {state.dogsData[0].breeds[0].height.metric ? (
                          <ListItem>
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                              <Height />
                            </ListItemIcon>
                            <ListItemText
                              primary={state.dogsData[0] ? (state.dogsData[0].breeds[0].height.metric + ' centímetros') : ('')}
                              secondary="Altura"
                            />
                          </ListItem>
                        ) : null}

                        {state.dogsData[0].breeds[0].weight.metric ? (
                          <ListItem>
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                              <Scale />
                            </ListItemIcon>
                            <ListItemText
                              primary={state.dogsData[0] ? (state.dogsData[0].breeds[0].weight.metric + ' quilogramas') : ('')}
                              secondary="Peso"
                            />
                          </ListItem>
                        ) : null}

                        {state.dogsData[0].breeds[0].life_span ? (
                          <ListItem>
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                              <Favorite />
                            </ListItemIcon>
                            <ListItemText
                              primary={state.dogsData[0] ? (state.dogsData[0].breeds[0].life_span.replace('years', 'anos')) : ('')}
                              secondary="Expectativa de vida"
                            />
                          </ListItem>
                        ) : null}

                        <Box height={'35px'} />
                        {state.dogsData[0].breeds[0].bred_for ? (
                          <ListItem>
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                              <Settings />
                            </ListItemIcon>
                            <ListItemText
                              primary={state.dogsData[0] ? (state.dogsData[0].breeds[0].bred_for) : ('')}
                              secondary="Utilidades"
                            />
                          </ListItem>
                        ) : null}

                        {state.dogsData[0].breeds[0].temperament ? (
                          <ListItem>
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                              <Thermostat />
                            </ListItemIcon>
                            <ListItemText
                              primary={state.dogsData[0] ? (state.dogsData[0].breeds[0].temperament) : ('')}
                              secondary="Temperamento"
                            />
                          </ListItem>
                        ) : null}

                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              ) : <NotFound />}
            </Container>
          )}
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}