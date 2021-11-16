import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';

export default function DesignForm(props) {
  const [designName, setDesignName] = useState(props.design.designName);
  const [shirtBrand, setShirtBrand] = useState(props.design.shirtBrand);
  const [shirtSize, setShirtSize] = useState(props.design.shirtSize);
  const [shirtColor, setShirtColor] = useState(props.design.shirtColor);
  const [imageUrl, setImageUrl] = useState(props.design.imageUrl);

  const handleSelectImage = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      let url = URL.createObjectURL(img);
      setImageUrl(url);
    } else {
      console.log("f")
    }
  }

  const handleSaveDesign = () => {
    if (shirtBrand.length > 0 && shirtSize.length > 0 && shirtColor.length > 0 && imageUrl.length > 0) {
      const updatedDesign = {
        id: props.design.id,
        designName: designName,
        shirtBrand: shirtBrand,
        shirtSize: shirtSize,
        shirtColor: shirtColor,
        imageUrl: imageUrl,
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
      <TextField id="design-name" label="Nombre del diseño" variant="outlined" value={designName} onChange={e => setDesignName(e.target.value)} />
      <TextField id="shirt-brand" label="Marca de la playera" variant="outlined" value={shirtBrand} onChange={e => setShirtBrand(e.target.value)} />
      <TextField id="shirt-size" label="Tamaño de la playera" variant="outlined" value={shirtSize} onChange={e => setShirtSize(e.target.value)} />
      <TextField id="shirt-color" label="Color de la playera" variant="outlined" value={shirtColor} onChange={e => setShirtColor(e.target.value)} />
      <p>{imageUrl}</p>
      <Button
        variant="contained"
        component="label"
      >
        Subir foto
        <input
          type="file"
          hidden
          onChange={handleSelectImage}
        />
      </Button>
      <div>
        <Button variant="contained" onClick={handleSaveDesign}>Guardar diseño</Button>
        <Button variant="contained" onClick={props.closeDialog}>Cancelar diseño</Button>
      </div>
      <div>
        <img src={imageUrl} style={{ height: '300px' }} />

      </div>
    </Container>
  );
}