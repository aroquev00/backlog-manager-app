import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function QuoteForm(props) {
  const [quote, setQuote] = useState(JSON.parse(JSON.stringify(props.quote)));

  const calculateTotal = quote => {
    let sum = 0;
    quote.designItems.forEach(item => {
      sum += item.price;
    });
    quote.extraItems.forEach(item => {
      sum += item.price;
    });
    quote.total = sum;
    return quote;
  }

  const handleDesignPriceUpdate = (index, price) => {
    let localQuote = quote;
    localQuote.designItems[index].price = Number(price);
    localQuote = calculateTotal(localQuote);
    setQuote({ ...localQuote })
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Descripcion</TableCell>
            <TableCell align="right">Costo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quote.designItems.map((designItem, index) => {
            return (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {designItem.description}
                </TableCell>
                <TableCell align="right"><TextField type="number" value={designItem.price} onChange={(e) => { handleDesignPriceUpdate(index, e.target.value) }} /></TableCell>
              </TableRow>
            );
          })}
          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Gran total
            </TableCell>
            <TableCell align="right">
              ${quote.total}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div>
        <Button variant="contained" onClick={() => { }}>Guardar diseño</Button>
        <Button variant="contained" onClick={() => { props.closeDialog() }}>Salir sin cambios</Button>
      </div>
    </TableContainer>
  );
}
