import { Container, Typography } from "@mui/material";
import React from "react";

export default function RegisterCustomer() {
  return(
    <Container maxWidth="lg" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Typography variant="h3" style={{margin: '10px'}}> Registrar cliente </Typography>
    </Container>
  );
}