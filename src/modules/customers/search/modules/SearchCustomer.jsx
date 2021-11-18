import { Container, Typography, Stack, Grid, Card, CardContent, CardActions, TextField, Button } from "@mui/material";
import React from "react";
import fire from '../../../../fire';

export default class SearchCustomer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      info: ""
    };
  }

  render() {
    let customerArray = [];
    let customers = [];
    const initDB = async() => {
      const db = fire.firestore();
      customers = await db.collection('customers').get();
    }

    return(
      <Container maxWidth="lg" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <Stack spacing={3} mb={10}>
          <Typography variant="h3" style={{margin: '30px 10px 10px'}}> Buscar cliente </Typography>

          <TextField label="Información del cliente" margin="normal" value={this.state.info}  
                     onChange={e => this.setState({info: e.target.value})} />
          <Button variant="contained" size="large"
            onClick={() => {
              customers.forEach((doc) => {
                let customerObject = doc.data();

                if (customerObject.name === this.state.info 
                    || customerObject.phone === this.state.info 
                    || customerObject.email === this.state.info) {
                      customerArray.push(customerObject);
                }
              });
            }}
          > 
            Buscar
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {console.log(customerArray)}
          {
            customerArray.map((customer) =>
              <Grid item xs={3}>
              <Card variant="outlined" sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {customer.name}
                  </Typography>
                  <br />
                  <Typography variant="body2">
                    {customer.phone}
                  </Typography>
                  <Typography variant="body2">
                    {customer.email}
                  </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Editar datos</Button>
                  </CardActions>
                </Card>
              </Grid>
            )
        }
            
          <Grid item xs={3}>
            <Card variant="outlined" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Nombre del cliente
                </Typography>
                <br />
                <Typography variant="body2">
                  Teléfono del cliente
                </Typography>
                <Typography variant="body2">
                  E-mail del cliente
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Editar datos</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card variant="outlined" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Nombre del cliente
                </Typography>
                <br />
                <Typography variant="body2">
                  Teléfono del cliente
                </Typography>
                <Typography variant="body2">
                  E-mail del cliente
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Editar datos</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card variant="outlined" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Nombre del cliente
                </Typography>
                <br />
                <Typography variant="body2">
                  Teléfono del cliente
                </Typography>
                <Typography variant="body2">
                  E-mail del cliente
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Editar datos</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card variant="outlined" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Nombre del cliente
                </Typography>
                <br />
                <Typography variant="body2">
                  Teléfono del cliente
                </Typography>
                <Typography variant="body2">
                  E-mail del cliente
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Editar datos</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card variant="outlined" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Nombre del cliente
                </Typography>
                <br />
                <Typography variant="body2">
                  Teléfono del cliente
                </Typography>
                <Typography variant="body2">
                  E-mail del cliente
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Editar datos</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card variant="outlined" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Nombre del cliente
                </Typography>
                <br />
                <Typography variant="body2">
                  Teléfono del cliente
                </Typography>
                <Typography variant="body2">
                  E-mail del cliente
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Editar datos</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}