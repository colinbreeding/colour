import React from "react";
import "./styles/NewPaletteForm.css";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import DraggableColorBox from "./DraggableColorBox";

const drawerWidth = 400;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
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
  const theme = useTheme();
  const { maxColors = 20, palettes } = props;
  const [open, setOpen] = React.useState(false);
  const [colors, setNewColor] = React.useState(props.palettes[0].colors);
  const [colorName, setColorName] = React.useState("");
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
  const handleSubmit = (paletteName) => {
    const newPalette = {
      paletteName: paletteName,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors,
    };
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
    let rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setNewColor([...colors, randomColor]);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <PaletteFormNav
        open={open}
        palettes={palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
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
          <DraggableColorBox
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
