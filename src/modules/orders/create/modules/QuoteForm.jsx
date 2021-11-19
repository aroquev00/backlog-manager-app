import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
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

  const emptyQuoteItem = {
    description: "",
    price: 0,
  };

  const addExtraItem = () => {
    let localQuote = quote;
    localQuote.extraItems.push(emptyQuoteItem);
    setQuote({ ...localQuote })
  };

  const handleExtraItemDescriptionUpdate = (index, description) => {
    let localQuote = quote;
    localQuote.extraItems[index].description = description;
    setQuote({ ...localQuote })
  };

  const handleExtraItemPriceUpdate = (index, price) => {
    let localQuote = quote;
    localQuote.extraItems[index].price = Number(price);
    localQuote = calculateTotal(localQuote);
    setQuote({ ...localQuote })
  };

  const deleteExtraItem = index => {
    let localQuote = quote;
    localQuote.extraItems.splice(index, 1);
    localQuote = calculateTotal(localQuote);
    setQuote({ ...localQuote });
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
          {
            quote.extraItems.map((extraItem, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <IconButton aria-label="delete" onClick={() => deleteExtraItem(index)}>
                      <DeleteIcon />
                    </IconButton>
                    <TextField id="item-name" value={extraItem.description} onChange={e => { handleExtraItemDescriptionUpdate(index, e.target.value) }} />
                  </TableCell>
                  <TableCell align="right"><TextField type="number" value={extraItem.price} onChange={(e) => { handleExtraItemPriceUpdate(index, e.target.value) }} /></TableCell>
                </TableRow>
              );
            })
          }
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
        <Button variant="contained" onClick={addExtraItem}>Añadir concepto extra</Button>
      </div>
      <div>
        <Button variant="contained" onClick={() => { props.saveQuote(quote); props.closeDialog(); }}>Guardar cotización</Button>
        <Button variant="contained" onClick={() => { props.closeDialog() }}>Salir sin cambios</Button>
      </div>
    </TableContainer>
  );
}
