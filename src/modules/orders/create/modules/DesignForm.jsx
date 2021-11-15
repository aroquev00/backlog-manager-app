import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { height } from '@mui/system';

export default function DesignForm(props) {
  const [marcaPlayera, setMarcaPlayera] = useState(props.design.marcaPlayera);
  const [sizePlayera, setSizePlayera] = useState(props.design.sizePlayera);
  const [colorPlayera, setColorPlayera] = useState(props.design.colorPlayera);
  const [urlImagen, setUrlImagen] = useState(props.design.urlImagen);

  const handleSelectImagen = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log('hm');
      let url = URL.createObjectURL(img);
      setUrlImagen(url);
      console.log(url);
    } else {
      console.log("f")
    }
  }

  const handleSaveDesign = () => {
    if (marcaPlayera.length > 0 && sizePlayera.length > 0 && colorPlayera.length > 0 && urlImagen.length > 0) {
      const updatedDesign = {
        id: props.design.id,
        marcaPlayera: marcaPlayera,
        sizePlayera: sizePlayera,
        colorPlayera: colorPlayera,
        urlImagen: urlImagen,
      };
      props.saveDesign(props.index, updatedDesign);
      props.closeDialog();
    } else {
      console.log('incomplete data');
    }
  };

  return (
    <Container>
      <h1>Añador diseño</h1>

      <TextField id="marca-playera" label="Marca de la playera" variant="outlined" value={marcaPlayera} onChange={e => setMarcaPlayera(e.target.value)} />
      <TextField id="size-playera" label="Tamaño de la playera" variant="outlined" value={sizePlayera} onChange={e => setSizePlayera(e.target.value)} />
      <TextField id="color-playera" label="Color de la playera" variant="outlined" value={colorPlayera} onChange={e => setColorPlayera(e.target.value)} />
      <p>{urlImagen}</p>
      <Button
        variant="contained"
        component="label"
      >
        Subir foto
        <input
          type="file"
          hidden
          onChange={handleSelectImagen}
        />
      </Button>
      <div>
        <Button variant="contained" onClick={handleSaveDesign}>Guardar diseño</Button>
        <Button variant="contained" onClick={props.closeDialog}>Cancelar diseño</Button>
      </div>
      <div>
        <img src={urlImagen} style={{ height: '300px' }} />

      </div>
    </Container>
  );
}