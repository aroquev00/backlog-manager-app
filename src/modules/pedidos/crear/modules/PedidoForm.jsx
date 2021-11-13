import { useState } from 'react';
import Button from '@mui/material/Button';
import { Container, Typography } from "@mui/material";
import DesignForm from "./DesignForm";
import Dialog from "@mui/material/Dialog";

export default function PedidoForm(props) {
  const [isDesignDialogOpen, setIsDesignDialogOpen] = useState(false);
  const [activeDesign, setActiveDesign] = useState({});

  const handleDesignDialogOpen = (design) => {
    setIsDesignDialogOpen(true);
    setActiveDesign(design);
  };

  const closeDesignDialog = () => {
    setIsDesignDialogOpen(false);
  };

  return (
    <>
      <h1>Diseños</h1>
      <Dialog open={isDesignDialogOpen}>
        <DesignForm closeDialog={closeDesignDialog} design={ activeDesign } />
      </Dialog>
      {props.pedido.designs.map((design, index) => {
        return (<Button key={index} variant="contained" onClick={() => {handleDesignDialogOpen(design)}} >Pedido {index}</Button>);
      })}
    </>
  );
}