import { Container, Typography, Button } from "@mui/material";
import React, {useEffect, useState} from "react";
import fire from "../../../fire";
import { DataGrid } from '@mui/x-data-grid';
import { useHistory } from "react-router";
import { Routes } from "../../general/utils/routes";

export default function Dashboard() {

  const history = useHistory();
  const db = fire.firestore();
  const [orders, setOrders] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 200, sortable: false},
    {
      field: 'status',
      headerName: 'Estatus',
      width: 150,
      sortable: false,
    },
    {
      field: 'date',
      headerName: 'Fecha de Entrega',
      width: 200,
      sortable: false,
      valueGetter: (params) => {
        let date = new Date(params.row.deliveryDate);
        return date.toLocaleDateString("es-MX");
      },
    },
    {
      field: 'orderName',
      headerName: 'Nombre en la Orden',
      width: 200,
      sortable: false,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 100,
      sortable: false,
      valueGetter: (params) => `$${params.row.quote.total}`,
    },
    {
      field: 'items',
      headerName: 'Numero de diseños',
      width: 180,
      sortable: false,
      valueGetter: (params) => `${params.row.designs.length}`,
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          history.push(Routes.displayOrder + `/${params.id}`);
        };
        return <Button variant="contained" onClick={onClick}>Detalles</Button>;
      },
    },
  ];

  useEffect(() => {
    db.collection("orders").get().then(data => {
      let fireOrders = [];
      data.forEach(doc => {
        fireOrders.push({id: doc.id, ...doc.data()});
      })
      setOrders(fireOrders);
    })
  }, []);

  const [sortModel, setSortModel] = useState([
    {
      field: 'date',
      sort: 'desc',
    },
  ]);

  return(
    <Container maxWidth="lg" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Typography variant="h3" style={{margin: '10px'}}> Tablero </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={orders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sortModel={sortModel}
        />
      </div>
    </Container>
  );
}