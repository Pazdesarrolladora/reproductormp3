import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { pink } from '@mui/material/colors';
import { Box } from "@mui/material";



function App() {
  const audioRef = useRef(null);
  const [canciones, setCanciones] = useState([]);
  const [cancionActual, setCancionActual] = useState(0);
  const [botoneraHabilitada, setBotoneraHabilitada] = useState(false);
  const [listaNombresCanciones, setListaNombresCanciones] = useState([]);
  const [cancionSeleccionada, setCancionSeleccionada] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    obtenerCanciones();
    setBotoneraHabilitada(true);
  }, []);

  useEffect(() => {
    const nombres = canciones.map((cancion) => cancion.name);
    setListaNombresCanciones(nombres);
  }, [canciones]);

  const obtenerCanciones = () => {
    fetch("https://assets.breatheco.de/apis/sound/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const cancionesFx = data["data/fx.json"];
        const cancionesSongs = data["data/songs.json"];
        setCanciones([...cancionesSongs, ...cancionesFx]);
      })
      .catch((error) => console.log(error));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const reproducirCancion = (index) => {
    console.log("index " + index);
    setCancionActual(index);
    setCancionSeleccionada(index);
    audioRef.current.src =
      "https://assets.breatheco.de/apis/sound/" + canciones[index].url;
    console.log(audioRef.current.src);
    audioRef.current.play();
  };

  const reproducirSiguienteCancion = () => {
    const siguienteCancion =
      cancionActual === canciones.length - 1 ? 0 : cancionActual + 1;
    reproducirCancion(siguienteCancion);
  };

  const reproducirCancionAnterior = () => {
    const cancionAnterior =
      cancionActual === 0 ? canciones.length - 1 : cancionActual - 1;
    reproducirCancion(cancionAnterior);
  };

  return (
   
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "30%",
      margin: "0 auto",
      padding: "50px",
      
    }}
  >
    <Grid
      container
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        border: "2px solid white",
        borderRadius: "15px",
        
      }}
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <h1 align="center">PlayList</h1>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item >
          <Box
      component="img"
      src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif"
      alt="imagenrandom"
      sx={{ width: 150, height: 150 }}
    />          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button
              onClick={reproducirCancionAnterior}
              disabled={!botoneraHabilitada}
            >
              <SkipPreviousIcon style={{ fontSize: 40, color: pink[500] }}/>
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={reproducirSiguienteCancion}
              disabled={!botoneraHabilitada}
            >
              <SkipNextIcon style={{ fontSize: 40, color: pink[500] }}/>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <audio ref={audioRef} controls />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item style={{ color: pink[500] }}>
            <Button 
              aria-controls="dropdown-menu"
              aria-haspopup="true"
              onClick={handleClick}
              variant="contained"
            >
              Seleccionar canción
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Menu 
          id="dropdown-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {listaNombresCanciones.map((nombre, index) => (
            <MenuItem key={index} onClick={() => reproducirCancion(index)}>
              {nombre}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </Grid>
    </Box>
 
  );
}

export default App;
