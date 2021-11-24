import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function DesignForm(props) {
  const [designName, setDesignName] = useState(props.design.designName);
  const [shirtBrand, setShirtBrand] = useState(props.design.shirtBrand);
  const [shirtSize, setShirtSize] = useState(props.design.shirtSize);
  const [shirtColor, setShirtColor] = useState(props.design.shirtColor);
  const [imageUrl, setImageUrl] = useState(props.design.imageUrl);
  const [imageObject, setImageObject] = useState({});
  const [comments, setComments] = useState(props.design.comments);

  const handleSelectImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      let url = URL.createObjectURL(img);
      setImageUrl(url);
      setImageObject(img);
    } else {
      console.log("f");
    }
  };

  const handleSaveDesign = () => {
    if (
      shirtBrand.length > 0 &&
      shirtSize.length > 0 &&
      shirtColor.length > 0 &&
      imageUrl.length > 0
    ) {
      const updatedDesign = {
        id: props.design.id,
        designName: designName,
        shirtBrand: shirtBrand,
        shirtSize: shirtSize,
        shirtColor: shirtColor,
        imageUrl: imageUrl,
        comments: comments,
      };
      props.saveDesign(props.index, updatedDesign, imageObject);
      props.closeDialog();
    } else {
      console.log("incomplete data");
    }
  };

  return (
    <Container maxWidth>
      <div style={{ width: "550px", margin: "20px" }}>
        <h1>Editar diseño</h1>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="design-name"
              label="Nombre del diseño"
              variant="outlined"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              disabled={!props.editMode}
            />
            <TextField
              id="shirt-brand"
              label="Marca de la playera"
              variant="outlined"
              value={shirtBrand}
              onChange={(e) => setShirtBrand(e.target.value)}
              disabled={!props.editMode}
            />
            <TextField
              id="shirt-size"
              label="Tamaño de la playera"
              variant="outlined"
              value={shirtSize}
              onChange={(e) => setShirtSize(e.target.value)}
              disabled={!props.editMode}
            />
            <TextField
              id="shirt-color"
              label="Color de la playera"
              variant="outlined"
              value={shirtColor}
              onChange={(e) => setShirtColor(e.target.value)}
              disabled={!props.editMode}
            />
            <TextField
              id="design-comments"
              label="Comentarios"
              multiline
              rows={2}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              disabled={!props.editMode}
            />
          </div>
          <div>
            <img src={imageUrl} style={{ height: "300px" }} />
          </div>
        </Box>

        <Stack direction="row" spacing={2} marginBottom={5} marginTop={5}>
          {props.editMode && (
            <Button variant="outlined" component="label">
              Subir foto
              <input
                type="file"
                hidden
                onChange={handleSelectImage}
                accept="image/*"
              />
            </Button>
          )}
          {props.editMode && (
            <Button variant="contained" onClick={handleSaveDesign}>
              Guardar
            </Button>
          )}
          <Button variant="contained" onClick={props.closeDialog}>
            {props.editMode ? "Cancelar" : "Volver"}
          </Button>
        </Stack>
      </div>
    </Container>
  );
}