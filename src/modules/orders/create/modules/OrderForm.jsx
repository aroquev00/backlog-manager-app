import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DesignForm from "./DesignForm";
import QuoteForm from "./QuoteForm";
import { Routes } from "../../../general/utils/routes";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Dialog from "@mui/material/Dialog";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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

  useEffect(() => {
    setOrder(JSON.parse(JSON.stringify(props.order)));
  }, [props.order])

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
        customersArray.push(customerObject);
      });
      setCustomers(customersArray);
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    resetCustomer();
  }, [props.order])

  const setNewOrderCustomer = (event, newOrderCustomer) => {
    let localOrder = order;
    if (newOrderCustomer != null) {
      setOrderCustomer(newOrderCustomer);
      localOrder.customerId = newOrderCustomer.id;
      localOrder.customerName = newOrderCustomer.name;
    } else {
      setOrderCustomer(emptyCustomer);
      localOrder.customerId = "";
      localOrder.customerName = "";
    }
    setOrder({ ...localOrder });
  };

  // Delivery date
  const setNewDeliveryDate = newDeliveryDate => {
    let localOrder = order;
    localOrder.deliveryDate = newDeliveryDate != null ? newDeliveryDate.toString() : "";
    setOrder({ ...localOrder })
  };

  // Designs
  const [imageObjects, setImageObjects] = useState([]);

  const resetImageObjects = () => {
    setImageObjects(Array(props.order.designs.length).fill(null));
  }

  useEffect(() => {
    resetImageObjects();
  }, [props.order])

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

    let localImageObjects = imageObjects;
    localImageObjects.push(null);
    setImageObjects(localImageObjects);
  }

  const deleteDesign = (index) => {
    let localOrder = order;
    localOrder.designs.splice(index, 1);
    localOrder.quote.designItems.splice(index, 1);
    setOrder({ ...localOrder })

    let localImageObjects = imageObjects;
    localImageObjects.splice(index, 1);
    setImageObjects(localImageObjects);
  }

  const saveDesign = (index, design, imageObject) => {
    let localOrder = order;
    localOrder.designs[index] = design;
    localOrder.quote.designItems[index].description = design.designName;
    setOrder({ ...localOrder });

    if (design.imageUrl.includes('localhost')) {
      let localImageObjects = imageObjects;
      localImageObjects[index] = imageObject;
      setImageObjects(localImageObjects);
    }
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
  
  // Status
  const statusOptions = [
    "Pendiente cotización",
    "Pendiente confirmación",
    "Confirmado",
    "Completado",
    "Archivado",
    "Cancelado",
  ]

  const handleStatusChange = event =>  {
    let localOrder = order;
    localOrder.status = event.target.value;
    setOrder({ ...localOrder });
  };

  // Save order
  let storageRef = fire.storage().ref();

  const uploadImage = async (imageLocalUrl, imageObject) => {
    const imageName = imageObject.name.split('/').at(-1);
    var metadata = {
      contentType: imageObject.type,
    };
    let imageRef = storageRef.child('images/' + imageName);
    let response = await imageRef.put(imageObject, metadata);
    return response.ref.getDownloadURL();
  };
  //uploadImage("blob:http://localhost:3000/a55c13dc-bf01-4a94-a3e9-0135f070bace");

  const saveOrder = async () => {
    if (!validateOrderData()) {
      return;
    }
    // Upload images
    let index = 0;
    for (let design of order.designs) {
      if (imageObjects[index] !== null) {
        design.imageUrl = await uploadImage(design.imageUrl, imageObjects[index]);
      }
      index += 1;
    }
    let localOrder = order;
    delete localOrder.id;
    db.collection("orders").add(localOrder)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        window.location.href = Routes.displayOrder + `/${docRef.id}`;
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  // Update order
  const updateOrder = async () => {
    if (!validateOrderData()) {
      return;
    }
    // Upload images
    let index = 0;
    for (let design of order.designs) {
      if (imageObjects[index] !== null) {
        design.imageUrl = await uploadImage(design.imageUrl, imageObjects[index]);
      }
      index += 1;
    }
    let localOrder = order;
    const orderId = order.id;
    delete localOrder.id;
    db.collection("orders").doc(orderId).update(localOrder)
      .then(() => {
        setEditMode(false);
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  // Discard order changes
  const discardOrderChanges = () => {
    resetImageObjects();
    resetCustomer();
    setOrder(JSON.parse(JSON.stringify(props.order)));
    setEditMode(false);
  };

  const resetCustomer = () => {
    let foundCustomer = false;
    customers.forEach(customer => {
      if (props.order.customerId === customer.id) {
        setOrderCustomer(customer);
        foundCustomer = true;
      }
    })
    if (!foundCustomer) { setOrderCustomer(emptyCustomer); }
  }

  const validateOrderData = () => {
    if (order.orderName.length === 0) {
      window.alert('Llenar el campo de nombre de pedido');
      return false;
    }
    if (order.customerId === "") {
      window.alert('Elegir un cliente para el pedido');
      return false;
    }
    if (order.deliveryDate === "Invalid Date" || order.deliveryDate === "") {
      window.alert('Llenar el campo de fecha de entrega con fecha válida');
      return false;
    }
    if (order.designs.length === 0) {
      window.alert('El pedido debe tener al menos un diseño');
      return false;
    }
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
        <DesignForm closeDialog={closeDesignDialog} design={activeDesign} index={activeDesignIndex} saveDesign={saveDesign} editMode={editMode} />
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
        <QuoteForm closeDialog={closeQuoteDialog} quote={{ ...order.quote }} saveQuote={saveQuote} editMode={editMode} />
      </Dialog>
      <Button variant="contained" onClick={() => { setIsQuoteDialogOpen(true) }} >Cotización</Button>
      <br />
      <FormControl fullWidth>
        <InputLabel id="estatus">Estatus</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={order.status}
          label="Estatus"
          onChange={handleStatusChange}
          disabled={!editMode}
        >
          {statusOptions.map(option =>  {
            return (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
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
