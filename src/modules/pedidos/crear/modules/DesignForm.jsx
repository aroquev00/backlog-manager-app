import {useState} from 'react';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';

export default function DesignForm() {
  const [marcaPlayera, setMarcaPlayera] = useState("");

  const handleChangeMarcaPlayera = (e) => {
    setMarcaPlayera(e.target.value);
  }


  return (
    <Container>
      <h1>Add a design</h1>

      <TextField id="marca-playera" label="Marca de la playera" variant="outlined" value={marcaPlayera} onChange={handleChangeMarcaPlayera} />
    </Container>
  );
}