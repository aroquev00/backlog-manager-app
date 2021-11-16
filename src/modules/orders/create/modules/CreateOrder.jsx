import { Container, Typography } from "@mui/material";
import OrderForm from './OrderForm';

export default function CreateOrder() {
  const emptyOrder = {
    id: "",
    orderName: "Nuevo pedido",
    customerId: "",
    designs: [{
      id: "",
      designName: "Diseño 1",
      shirtBrand: "",
      shirtSize: "",
      shirtColor: "",
      imageUrl: "",
    }],
    deliveryDate: (new Date()).toString(),
  };
  return (
    <Container maxWidth="lg" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h3" style={{ margin: '10px' }}> Crear pedido </Typography>
      <OrderForm order={emptyOrder} />
    </Container>
  );
}