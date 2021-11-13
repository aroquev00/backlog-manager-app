import { useState } from 'react';
import { Container, Typography } from "@mui/material";
import PedidoForm from './PedidoForm';

export default function CrearPedido() {
  const emptyPedido = {
    id: "",
    clienteId: "",
    designs: [{
      id: "",
      marcaPlayera: "",
      sizePlayera: "",
      colorPlayera: "",
      urlImagen: "",
    }],
    fechaEntrega: "",
  };
  return (
    <Container maxWidth="lg" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h3" style={{ margin: '10px' }}> Crear pedido </Typography>
      <PedidoForm pedido={emptyPedido} />
    </Container>
  );
}