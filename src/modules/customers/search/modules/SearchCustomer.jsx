import { Container, Typography, Stack, Grid, Card, CardContent, CardActions, TextField, Button } from "@mui/material";
import React from "react";

export default function SearchCustomer() {
  return(
    <Container maxWidth="lg" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Stack spacing={3} mb={10}>
        <Typography variant="h3" style={{margin: '30px 10px 10px'}}> Buscar cliente </Typography>

        <TextField label="Nombre del cliente" margin="normal" />
        <Button variant="contained" size="large"
          onClick={() => {
            alert('clicked');
          }}
        > 
          Buscar
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Card variant="outlined" sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Nombre del cliente
              </Typography>
              <br />
              <Typography variant="body2">
                Teléfono del cliente
              </Typography>
              <Typography variant="body2">
                E-mail del cliente
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Editar datos</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card variant="outlined" sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Nombre del cliente
              </Typography>
              <br />
              <Typography variant="body2">
                Teléfono del cliente
              </Typography>
              <Typography variant="body2">
                E-mail del cliente
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Editar datos</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card variant="outlined" sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Nombre del cliente
              </Typography>
              <br />
              <Typography variant="body2">
                Teléfono del cliente
              </Typography>
              <Typography variant="body2">
                E-mail del cliente
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Editar datos</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card variant="outlined" sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Nombre del cliente
              </Typography>
              <br />
              <Typography variant="body2">
                Teléfono del cliente
              </Typography>
              <Typography variant="body2">
                E-mail del cliente
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Editar datos</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card variant="outlined" sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Nombre del cliente
              </Typography>
              <br />
              <Typography variant="body2">
                Teléfono del cliente
              </Typography>
              <Typography variant="body2">
                E-mail del cliente
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Editar datos</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}