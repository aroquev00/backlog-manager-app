import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Routes } from "../../general/utils/routes";
import TabMenu from "./TabMenu";

export default function NavTabs() {
  const pedidosMenuItems = {
    "title": "Pedidos",
    "options": [
      {
        "optionTitle": "Crear nuevo pedido",
        "optionLink": Routes.crearPedido,
      },
      {
        "optionTitle": "Buscar pedido",
        "optionLink": Routes.buscarPedido,
      }
    ]
  }
  const clientesMenuItems = {
    "title": "Clientes",
    "options": [
      {
        "optionTitle": "Registrar nuevo cliente",
        "optionLink": Routes.registrarCliente,
      },
      {
        "optionTitle": "Buscar cliente",
        "optionLink": Routes.buscarCliente,
      }
    ]
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Button title="Tablero" href={Routes.tablero} color="primary">
        Tablero
      </Button>
      <TabMenu {...pedidosMenuItems} />
      <TabMenu {...clientesMenuItems} />
    </Box>
  );
}