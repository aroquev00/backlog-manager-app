import {
  Container,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Typography,
  Stack,
  Grid,
  Card,
  CardActions,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import { Routes } from "../../../general/utils/routes";
import fire from "../../../../fire";

export default class SearchOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: "",
      results: <div />,
      buscarPor: "id",
    };
  }

  render() {

    const handleSelectChange = (event) => {
      this.setState({ buscarPor: event.target.value });
    };

    let orders = [];

    const db = fire.firestore();

    const handleSearch = async () => {
      console.log(this.state.buscarPor);
      let cardsGrid = [];
      orders = await db.collection("orders").get();


      orders.forEach((doc) => {
        let orderObject = doc.data();
        orderObject.id = doc.id;
        let search = this.state.info.toLowerCase();
        console.log(search);

        if (
          (this.state.buscarPor === "id" &&
            orderObject.id &&
            orderObject.id.toString().toLowerCase().includes(search)) ||
          (this.state.buscarPor === "nombrePedido" &&
            orderObject.orderName &&
            orderObject.orderName.toString().toLowerCase().includes(search)) ||
          (this.state.buscarPor === "status" &&
            orderObject.status &&
            orderObject.status.toString().toLowerCase().includes(search)) ||
          (this.state.buscarPor === "idCliente" &&
            orderObject.customerId &&
            orderObject.customerId.toString().toLowerCase().includes(search)) ||
          (this.state.buscarPor === "nombreCliente" &&
            orderObject.customerName &&
            orderObject.customerName.toString().toLowerCase().includes(search))
        ) {
          console.log("order", orderObject);
          cardsGrid.push(
            <Grid key={orderObject.id} item xs={3}>
              <Card variant="outlined" sx={{ minHeight: 160 }}>
                <CardContent>
                  <Typography variant="h5">
                    {orderObject.orderName}
                  </Typography>
                  <Typography variant="h5" component="div">
                    <b>Cliente: </b> {orderObject.customerName}
                  </Typography>
                  <br />
                  <Typography variant="body2">
                    <b>Fecha de entrega:</b> {orderObject.deliveryDate}
                  </Typography>
                  <Typography variant="body2">
                    <b>Estatus:</b> {orderObject.status}
                  </Typography>
                </CardContent>
                <CardActions>
                  <a href={Routes.displayOrder + `/${orderObject.id}`}>
                    <div>
                      <Button size="small" >Ver pedido</Button>
                    </div>
                  </a>
                </CardActions>
              </Card>
            </Grid>
          );
        }
      });

      this.setState({ results: cardsGrid });
    };

    return (
      <Container
        maxWidth="lg"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Stack spacing={3} mb={10}>
          <Typography variant="h3" style={{ margin: "30px 10px 10px" }}>
            {" "}
            Buscar pedido{" "}
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Buscar por: </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.buscarPor}
              label="Buscar por "
              onChange={handleSelectChange}
            >
              <MenuItem value={"id"}>ID de Pedido</MenuItem>
              <MenuItem value={"nombrePedido"}>Nombre de Pedido</MenuItem>
              <MenuItem value={"status"}>Estatus de Pedido</MenuItem>
              <MenuItem value={"idCliente"}>ID del cliente</MenuItem>
              <MenuItem value={"nombreCliente"}>Nombre del cliente</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Información del pedido"
            margin="normal"
            value={this.state.info}
            onChange={(e) => this.setState({ info: e.target.value })}
          />
          <Button variant="contained" size="large" onClick={handleSearch}>
            Buscar
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {this.state.results}
        </Grid>
      </Container>
    );
  }
}
