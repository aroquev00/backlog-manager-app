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
      comments: "",
    }],
    quote: {
      designItems: [{
        description: "Diseño 1",
        price: 0,
      }],
      extraItems: [],
      total: 0,
    },
    deliveryDate: (new Date()).toString(),
    status: "Pendiente cotización",
  };
  return (
    <Container maxWidth="lg" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h3" style={{ margin: '10px' }}> Crear pedido </Typography>
      <OrderForm order={emptyOrder} type="new" />
    </Container>
  );
}
