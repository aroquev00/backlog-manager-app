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
    fetchCustomers();
  }, [])

  const setNewOrderCustomer = (event, newOrderCustomer) => {
    setOrderCustomer(newOrderCustomer);
    let localOrder = order;
    localOrder.customerId = newOrderCustomer.id;
    setOrder({ ...localOrder })
  };

  // Delivery date
  const [deliveryDate, setDeliveryDate] = useState(props.order.deliveryDate);

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
    console.log(order);
    const id = order.id;
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

  return (
    <>
      <TextField id="order-name" label="Nombre del pedido" variant="outlined" value={order.orderName} onChange={handleOrderNameChange} />
      <br />
      <Autocomplete
        value={orderCustomer}
        onChange={setNewOrderCustomer}
        id="combo-box-demo"
        options={customers}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Cliente" />}
      />
      <br />
      <div>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DesktopDatePicker
            label="Fecha de entrega"
            inputFormat="dd/MM/yyyy"
            value={deliveryDate}
            onChange={(newValue) => { setDeliveryDate(newValue) }}
            renderInput={(params) => <TextField {...params} />}
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
            <Button variant="contained" onClick={() => { deleteDesign(index); }}>Eliminar diseño</Button>
          </div>
        );
      })}
      <Button variant="contained" onClick={addEmptyDesign}>Añadir diseño</Button>
      <br />
      <Dialog open={isQuoteDialogOpen} maxWidth="xl">
        <QuoteForm closeDialog={closeQuoteDialog} quote={{ ...order.quote }} saveQuote={saveQuote} />
      </Dialog>
      <Button variant="contained" onClick={() => { setIsQuoteDialogOpen(true) }} >Cotización</Button>
      <br />
      <Button variant="contained" onClick={saveOrder} >Guardar pedido</Button>
    </>
  );
}
