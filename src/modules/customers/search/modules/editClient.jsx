import TextField from '@mui/material/TextField';
import { Container, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import React from "react";
import { height } from '@mui/system';

export default class EditClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentName: "",
            currentPhone: "",
            currentEmail: ""
        };
    }

    render() {
        return (
            <Container>
                <h1>Editar cliente</h1>

                <Stack spacing={3}>
                <TextField id="name" label="Nombre" variant="outlined" defaultValue={this.props.name}   
                           onChange={e => this.setState({currentName: e.target.value})} />
                <TextField id="phone" label="Teléfono" variant="outlined" defaultValue={this.props.phone}  
                           onChange={e => this.setState({currentPhone: e.target.value})} />
                <TextField id="email" label="Email" variant="outlined" defaultValue={this.props.email}   
                           onChange={e => this.setState({currentEmail: e.target.value})} />
                </Stack>

                <div>
                    <Button variant="contained"  style={{marginTop: '20px', marginRight: '10px', marginBottom: '20px'}} onClick={() => {
                            if (this.state.currentName.length > 0 && this.state.currentPhone.length > 0 && this.state.currentEmail.length > 0) {
                                const info = {
                                  name: this.state.currentName,
                                  phone: this.state.currentPhone,
                                  email: this.state.currentEmail
                                };
          
                                const res = this.props.database.collection('customers').doc(this.props.idToEdit).set(info);
                              } else {
                                console.log('incomplete data');
                              }

                            this.props.closeDialog()
                        }
                    }>Guardar</Button>
                    <Button variant="contained" style={{marginTop: '20px', marginLeft: '10px', marginBottom: '20px'}} onClick={this.props.closeDialog}>Cancelar</Button>
                </div>
            </Container>
        );
    }
}