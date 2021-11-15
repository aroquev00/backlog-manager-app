import { useState } from 'react';
import Button from '@mui/material/Button';
import { Container, Typography } from "@mui/material";
import DesignForm from "./DesignForm";
import Dialog from "@mui/material/Dialog";

export default function OrderForm(props) {
  const [order, setOrder] = useState(props.order);
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
    shirtBrand: "",
    shirtSize: "",
    shirtColor: "",
    imageUrl: "",
  };

  const addEmptyDesign = () => {
    let localOrder = order;
    localOrder.designs.push(emptyDesign);
    setOrder({ ...localOrder })
  }

  const deleteDesign = (index) => {
    let localOrder = order;
    localOrder.designs.splice(index, 1);
    setOrder({ ...localOrder })
  }

  const saveDesign = (index, design) => {
    let localOrder = order;
    localOrder.designs[index] = design;
    setOrder({ ...localOrder })
  };

  return (
    <>
      <h1>Diseños</h1>
      <Dialog open={isDesignDialogOpen}>
        <DesignForm closeDialog={closeDesignDialog} design={activeDesign} index={activeDesignIndex} saveDesign={saveDesign} />
      </Dialog>
      {order.designs.map((design, index) => {
        return (
          <div key={index}>
            <Button variant="contained" onClick={() => { handleDesignDialogOpen(index, design) }} >Diseño {index + 1}</Button>
            <Button variant="contained" onClick={() => { deleteDesign(index); }}>Eliminar diseño</Button>
          </div>
        );
      })}
      <Button variant="contained" onClick={addEmptyDesign}>Añadir diseño</Button>
    </>
  );
}
