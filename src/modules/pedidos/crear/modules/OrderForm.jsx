import { useState } from 'react';
import Button from '@mui/material/Button';
import { Container, Typography } from "@mui/material";
import DesignForm from "./DesignForm";
import Dialog from "@mui/material/Dialog";

export default function OrderForm(props) {
  const [pedido, setPedido] = useState(props.pedido);
  const [isDesignDialogOpen, setIsDesignDialogOpen] = useState(false);
  const [activeDesign, setActiveDesign] = useState({});
  const [activeDesignIndex, setActiveDesignIndex] = useState();

  const handleDesignDialogOpen = (index, design) => {
    setActiveDesignIndex(index);
    setIsDesignDialogOpen(true);
    setActiveDesign(design);
  };

  const closeDesignDialog = () => {
    setIsDesignDialogOpen(false);
  };

  const emptyDesign = {
    id: "",
    marcaPlayera: "",
    sizePlayera: "",
    colorPlayera: "",
    urlImagen: "",
  };

  const addEmptyDesign = () => {
    let localPedido = pedido;
    localPedido.designs.push(emptyDesign);
    setPedido({ ...localPedido })
  }

  const deleteDesign = (index) => {
    let localPedido = pedido;
    localPedido.designs.splice(index, 1);
    setPedido({ ...localPedido })
  }

  const saveDesign = (index, design) => {
    console.log(index);
    let localPedido = pedido;
    localPedido.designs[index] = design;
    setPedido({ ...localPedido })
  };

  return (
    <>
      <h1>Diseños</h1>
      <Dialog open={isDesignDialogOpen}>
        <DesignForm closeDialog={closeDesignDialog} design={activeDesign} index={activeDesignIndex} saveDesign={saveDesign} />
      </Dialog>
      {pedido.designs.map((design, index) => {
        return (
          <div key={index}>
            <Button variant="contained" onClick={() => { handleDesignDialogOpen(index, design) }} >Diseño {index + 1}</Button>
            <Button variant="contained" onClick={() => {deleteDesign(index);}}>Eliminar diseño</Button>
          </div>
        );
      })}
      <Button variant="contained" onClick={addEmptyDesign}>Añadir diseño</Button>
    </>
  );
}
