import { Container, Typography, Stack, TextField, Button } from "@mui/material";
import React from "react";

/*
import fire from "fire";

Quizá así se agregan datos en Firebase?
function crearCliente(cid, nombre, telefono, email) {
  firebase.database().ref('clientes/' + cid).push({
    nombre: nombre,
    telefono: telefono,
    email: email
  });
}
*/

export default function RegistrarCliente() {
  return(
      <Container maxWidth="lg" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <Stack spacing={3}>
          <Typography variant="h3" style={{margin: '30px 10px 10px'}}> Registrar cliente </Typography>
          <TextField label="Nombre del cliente" />
          <TextField label="Teléfono del cliente" />
          <TextField label="Email del cliente" />
          <Button variant="contained" style={{marginTop: '50px'}} size="large"
            onClick={() => {
              alert('clicked');
            }}
          > 
            Registrar
          </Button>
        </Stack>
      </Container>
  );
}