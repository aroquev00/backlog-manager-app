import { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import OrderForm from '../create/modules/OrderForm';
import fire from '../../../fire';

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
};

export default function OrderPage() {
  const orderId = useLocation().pathname.split("/")[2];

  const [order, setOrder] = useState(emptyOrder);
  const db = fire.firestore();

  useEffect(() => {
    db.collection("orders").doc(orderId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          let localOrder = doc.data();
          localOrder.id = orderId;
          setOrder({ ...localOrder });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  return (
    <Container maxWidth="lg" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h3" style={{ margin: '10px' }}> Visualizar pedido </Typography>
      <OrderForm order={order} type="existing" />
    </Container>
  );
}