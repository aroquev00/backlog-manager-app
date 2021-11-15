import { Container, Typography } from "@mui/material";
import OrderForm from './OrderForm';

export default function CreateOrder() {
  const emptyOrder = {
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
      <OrderForm pedido={emptyOrder} />
    </Container>
  );
}