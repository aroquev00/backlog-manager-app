import { Container, Typography } from "@mui/material";
import React from "react";

export default function CrearPedido() {
  return(
    <Container maxWidth="lg" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Typography variant="h3" style={{margin: '10px'}}> Crear pedido </Typography>
    </Container>
  );
}