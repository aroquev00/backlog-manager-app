import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DesignForm from "./DesignForm";
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
  const [order, setOrder] = useState(props.order);

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

  const [deliveryDate, setDeliveryDate] = useState(props.order.deliveryDate);

  return (
    <>
      <Autocomplete
        value={orderCustomer}
        onChange={(event, newValue) => {
          setOrderCustomer(newValue);
        }}
        id="combo-box-demo"
        options={customers}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Cliente" />}
      />
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
      <br/>
      <div>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DesktopDatePicker
            label="Fecha de entrega"
            inputFormat="MM/dd/yyyy"
            value={deliveryDate}
            onChange={(newValue) => { setDeliveryDate(newValue) }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </>
  );
}
