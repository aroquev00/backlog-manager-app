import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Routes } from "../../general/utils/routes";
import TabMenu from "./TabMenu";

export default function NavTabs() {
  const ordersMenuItems = {
    "title": "Pedidos",
    "options": [
      {
        "optionTitle": "Crear nuevo pedido",
        "optionLink": Routes.createOrder,
      },
      {
        "optionTitle": "Buscar pedido",
        "optionLink": Routes.searchOrder,
      }
    ]
  }
  const customersMenuItems = {
    "title": "Clientes",
    "options": [
      {
        "optionTitle": "Registrar nuevo cliente",
        "optionLink": Routes.registerCustomer,
      },
      {
        "optionTitle": "Buscar cliente",
        "optionLink": Routes.searchCustomer,
      }
    ]
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Button title="Tablero" href={Routes.dashboard} color="primary">
        Tablero
      </Button>
      <TabMenu {...ordersMenuItems} />
      <TabMenu {...customersMenuItems} />
    </Box>
  );
}