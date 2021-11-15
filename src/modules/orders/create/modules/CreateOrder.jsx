import { Container, Typography } from "@mui/material";
import OrderForm from './OrderForm';

export default function CreateOrder() {
  const emptyOrder = {
    id: "",
    clientId: "",
    designs: [{
      id: "",
      shirtBrand: "",
      shirtSize: "",
      shirtColor: "",
      imageUrl: "",
    }],
    deliveryDate: "",
  };
  return (
    <Container maxWidth="lg" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h3" style={{ margin: '10px' }}> Crear pedido </Typography>
      <OrderForm order={emptyOrder} />
    </Container>
  );
}