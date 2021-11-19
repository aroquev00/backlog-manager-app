import { Container, Dialog, Typography, Stack, Grid, Card, CardContent, CardActions, TextField, Button } from "@mui/material";
import React from "react";
import fire from '../../../../fire';

import EditClient from "./editClient";

export default class SearchCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: "",
      results: <div />,
      editingClient: false,
      idToEdit: "",
      nameToEdit: "",
      phoneToEdit: "",
      emailToEdit: ""
    };
  }

  render() {
    let customerArray = [];
    let customers = [];

    const db = fire.firestore();

    const closeEditDialog = () => {
      this.setState({editingClient: false})
    };

    const handleSearch = async() => {
      let thing = [];
      customers = await db.collection('customers').get();

      {customers.forEach((doc) => {
        let customerObject = doc.data();
        console.log(customerObject)

        if (customerObject.name === this.state.info 
            || customerObject.phone === this.state.info 
            || customerObject.email === this.state.info) {
              thing.push(<Grid item xs={3}>
              <Card variant="outlined" sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {customerObject.name}
                  </Typography>
                  <br />
                  <Typography variant="body2">
                    {customerObject.phone}
                  </Typography>
                  <Typography variant="body2">
                    {customerObject.email}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => {
                    this.setState({
                      editingClient: true,
                      idToEdit: customerObject.name + ' - ' + customerObject.phone + ' - ' + customerObject.email,
                      nameToEdit: customerObject.name,
                      phoneToEdit: customerObject.phone,
                      emailToEdit: customerObject.email
                    })
                  }} >
                    Editar datos
                  </Button>
                </CardActions>
              </Card>
            </Grid>);
        }
      })}
      this.setState({results: thing})
    }

    return(
      <Container maxWidth="lg" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <Stack spacing={3} mb={10}>
          <Typography variant="h3" style={{margin: '30px 10px 10px'}}> Buscar cliente </Typography>

          <TextField label="Información del cliente" margin="normal" value={this.state.info}  
                     onChange={e => this.setState({info: e.target.value})} />
          <Button variant="contained" size="large"
            onClick={handleSearch}
          > 
            Buscar
          </Button>
        </Stack>

        <Grid container spacing={3}>{this.state.results}</Grid>
        <Dialog open={this.state.editingClient}>
          <EditClient closeDialog={closeEditDialog} database={db} id={this.state.idToEdit} 
                      name={this.state.nameToEdit} phone={this.state.phoneToEdit} email={this.state.emailToEdit} />
        </Dialog>
      </Container>
    );
  }
}
