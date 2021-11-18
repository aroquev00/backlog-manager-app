import { ConstructionRounded } from "@mui/icons-material";
import { Container, Typography, Stack, TextField, Button } from "@mui/material";
import React from "react";
import fire from '../../../../fire';

/*
Quizá así se agregan datos en Firebase?
function crearCliente(cid, nombre, telefono, email) {
  firebase.database().ref('clientes/' + cid).push({
    nombre: nombre,
    telefono: telefono,
    email: email
  });
}
*/

export default class RegisterCustomer extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: ""
    };
  }

  render() {
    return(
      <Container maxWidth="lg" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <Stack spacing={3}>
          <Typography variant="h3" style={{margin: '30px 10px 10px'}}> Registrar cliente </Typography>
          <TextField id ="client-name"  label="Nombre del cliente"    value={this.state.name}  onChange={e => this.setState({name: e.target.value})} />
          <TextField id ="client-phone" label="Teléfono del cliente"  value={this.state.phone} onChange={e => this.setState({phone: e.target.value})} />
          <TextField id ="client-email" label="Email del cliente"     value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
          <Button variant="contained" style={{marginTop: '50px'}} size="large" 
                  onClick={() => {
                    if (this.state.name.length > 0 && this.state.phone.length > 0 && this.state.email.length > 0) {
                      const info = {
                        name: this.state.name,
                        phone: this.state.phone,
                        email: this.state.email
                      };
                      const db = fire.firestore();

                      const res = db.collection('customers').add(info);
                    } else {
                      console.log('incomplete data');
                    }
                  }}> 
            Registrar
          </Button>
        </Stack>
      </Container>
    );
  }
}