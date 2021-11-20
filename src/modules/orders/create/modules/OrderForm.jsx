import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DesignForm from "./DesignForm";
import QuoteForm from "./QuoteForm";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Dialog from "@mui/material/Dialog";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import fire from '../../../../fire';

const emptyCustomer = {
  id: "",
  name: "",
  phone: "",
  email: "",
  label: "",
};

export default function OrderForm(props) {
  const [order, setOrder] = useState(JSON.parse(JSON.stringify(props.order)));

  // Edit mode
  const [editMode, setEditMode] = useState(props.type === "new");

  // Order name
  const handleOrderNameChange = event => {
    let localOrder = order;
    localOrder.orderName = event.target.value;
    setOrder({ ...localOrder })
  };

  // Order customer
  const [orderCustomer, setOrderCustomer] = useState(emptyCustomer);
  const [customers, setCustomers] = useState([emptyCustomer]);

  const db = fire.firestore();

  useEffect(() => {
    const fetchCustomers = async () => {
      let querySnapshot = await db.collection("customers").get();
      let customersArray = [];
      querySnapshot.forEach((doc) => {
        let customerObject = doc.data();
        customerObject.id = doc.id;
        customerObject.label = `${customerObject.name} - ${customerObject.phone} - ${customerObject.email}`;
        if (customerObject.id === props.order.customerId) {
          setOrderCustomer(customerObject);
        }
        customersArray.push(customerObject);
      });
      setCustomers(customersArray);
    };
    if (editMode) {
      fetchCustomers();
    }
  }, [editMode]);

  const setNewOrderCustomer = (event, newOrderCustomer) => {
    let localOrder = order;
    if (newOrderCustomer != null) {
      setOrderCustomer(newOrderCustomer);
      localOrder.customerId = newOrderCustomer.id;
    } else {
      setOrderCustomer(emptyCustomer);
      localOrder.customerId = "";
    }
    setOrder({ ...localOrder });
  };

  // Delivery date
  const setNewDeliveryDate = newDeliveryDate => {
    let localOrder = order;
    localOrder.deliveryDate = newDeliveryDate.toString();
    setOrder({ ...localOrder })
  };

  // Designs
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
    designName: "",
    shirtBrand: "",
    shirtSize: "",
    shirtColor: "",
    imageUrl: "",
    comments: "",
  };

  const addEmptyDesign = () => {
    let localOrder = order;
    let localEmptyDesign = emptyDesign;
    localEmptyDesign.designName = `Diseño ${order.designs.length + 1}`
    localOrder.designs.push(localEmptyDesign);

    let localEmptyQuoteItem = emptyQuoteItem;
    localEmptyQuoteItem.description = localEmptyDesign.designName;
    localOrder.quote.designItems.push(localEmptyQuoteItem);

    setOrder({ ...localOrder })
  }

  const deleteDesign = (index) => {
    let localOrder = order;
    localOrder.designs.splice(index, 1);
    localOrder.quote.designItems.splice(index, 1);
    setOrder({ ...localOrder })
  }

  const saveDesign = (index, design) => {
    let localOrder = order;
    localOrder.designs[index] = design;
    localOrder.quote.designItems[index].description = design.designName;
    setOrder({ ...localOrder });
  };

  // Quote
  const emptyQuoteItem = {
    description: "",
    price: 0,
  };

  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);

  const closeQuoteDialog = () => {
    setIsQuoteDialogOpen(false);
  }

  const saveQuote = quote => {
    let localOrder = order;
    localOrder.quote = quote;
    setOrder({ ...localOrder });
  };

  // Save order
  const saveOrder = () => {
    let localOrder = order;
    delete localOrder.id;
    db.collection("orders").add(localOrder)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  // Update order
  const updateOrder = () => {
    let localOrder = order;
    const orderId = order.id;
    delete localOrder.id;
    db.collection("orders").doc(orderId).update(localOrder)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  // Discard order changes
  const discardOrderChanges = () => {
    resetCustomer();
    setOrder(JSON.parse(JSON.stringify(props.order)));
    setEditMode(false);
  };

  const resetCustomer = () => {
    customers.forEach(customer => {
      if (props.order.customerId === customer.id) {
        setOrderCustomer(customer);
        return;
      }
    })
    setOrderCustomer(emptyCustomer);
  }

  return (
    <>
      <TextField id="order-name" label="Nombre del pedido" variant="outlined" value={order.orderName} onChange={handleOrderNameChange} disabled={!editMode} />
      <br />
      <Autocomplete
        value={orderCustomer}
        onChange={setNewOrderCustomer}
        id="combo-box-demo"
        options={customers}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Cliente" />}
        disabled={!editMode}
      />
      <br />
      <div>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DesktopDatePicker
            label="Fecha de entrega"
            inputFormat="dd/MM/yyyy"
            value={order.deliveryDate}
            onChange={(newValue) => { setNewDeliveryDate(newValue) }}
            renderInput={(params) => <TextField {...params} />}
            disabled={!editMode}
          />
        </LocalizationProvider>
      </div>
      <h1>Diseños</h1>
      <Dialog open={isDesignDialogOpen}>
        <DesignForm closeDialog={closeDesignDialog} design={activeDesign} index={activeDesignIndex} saveDesign={saveDesign} />
      </Dialog>
      {order.designs.map((design, index) => {
        return (
          <div key={index}>
            {design.designName}
            <Button variant="contained" onClick={() => { handleDesignDialogOpen(index, design) }} >Diseño {index + 1}</Button>
            {editMode &&
              (<Button variant="contained" onClick={() => { deleteDesign(index); }}>Eliminar diseño</Button>)
            }
          </div>
        );
      })}
      {editMode &&
        (<Button variant="contained" onClick={addEmptyDesign}>Añadir diseño</Button>)
      }
      <br />
      <Dialog open={isQuoteDialogOpen} maxWidth="xl">
        <QuoteForm closeDialog={closeQuoteDialog} quote={{ ...order.quote }} saveQuote={saveQuote} />
      </Dialog>
      <Button variant="contained" onClick={() => { setIsQuoteDialogOpen(true) }} >Cotización</Button>
      <br />
      {
        props.type === "new" ?
          (<Button variant="contained" onClick={saveOrder} >Guardar pedido</Button>)
          :
          (editMode ?
            (
              <>
                <Button variant="contained" onClick={updateOrder} >Actualizar pedido</Button>
                <Button variant="contained" onClick={discardOrderChanges} >Descartar cambios</Button>
              </>
            )
            :
            (<Button variant="contained" onClick={() => setEditMode(true)} >Editar pedido</Button>)
          )
      }

    </>
  );
}
