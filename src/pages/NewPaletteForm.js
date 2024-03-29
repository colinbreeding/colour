import React, { useState } from "react";
import "../styles/NewPaletteForm.css";
import PaletteFormNav from "../components/PaletteFormNav";
import ColorPickerForm from "../components/ColorPickerForm";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import MiniColorBox from "../components/MiniColorBox";
import seedColors from "../helpers/seedColors";

const drawerWidth = 400;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function NewPaletteForm(props) {
  const { maxColors = 20, palettes } = props;
  const [open, setOpen] = useState(true);
  const [colors, setNewColor] = useState(seedColors[0].colors);
  const [paletteName, setPaletteName] = useState("");
  const [colorName, setColorName] = useState("");
  const paletteFull = colors.length >= maxColors;

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    setNewColor((oldColors) => [...oldColors, newColor]);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleSubmit = (newPalette) => {
    newPalette.id = paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
    props.savePalette(newPalette);
    props.history.push("/");
  };
  const removeColor = (colorName) => {
    const deleteColor = colors.filter((color) => color.name !== colorName);
    setNewColor(deleteColor);
  };
  const clearColors = () => {
    setNewColor([]);
  };
  const addRandomColor = () => {
    const allColors = props.palettes.map((p) => p.colors).flat();
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      let rand = Math.floor(Math.random() * allColors.length);
      let randomColor = allColors[rand];
      isDuplicateColor = colors.some(
        (color) => color.name === randomColor.name
      );
      setNewColor([...colors, randomColor]);
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <PaletteFormNav
        open={open}
        palettes={palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
        paletteName={paletteName}
        setPaletteName={setPaletteName}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className="container">
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className="buttons">
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
              className="button"
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={paletteFull}
              className="button"
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            paletteFull={paletteFull}
            addNewColor={addNewColor}
            colorName={colorName}
            setColorName={setColorName}
            colors={colors}
          />
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {colors.map((color) => (
          <MiniColorBox
            color={color.color}
            name={color.name}
            key={color.name}
            handleClick={() => removeColor(color.name)}
          />
        ))}
      </Main>
    </Box>
  );
}

export default NewPaletteForm;
