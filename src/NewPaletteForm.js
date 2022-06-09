import React from "react";
import PaletteFormNav from "./PaletteFormNav";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import DraggableColorBox from "./DraggableColorBox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

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

export default function NewPaletteForm(props) {
  const theme = useTheme();
  const { maxColors = 20, palettes } = props;
  const [open, setOpen] = React.useState(false);
  const [curColor, setColor] = React.useState("teal");
  const [colors, setNewColor] = React.useState(props.palettes[0].colors);
  const [colorName, setColorName] = React.useState("");
  const paletteFull = colors.length >= maxColors;

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return colors.every(
        ({ color }) => color.toLowerCase() !== curColor.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = (newColor) => {
    setColor(newColor.hex);
  };
  const addNewColor = () => {
    const newColor = { color: curColor, name: colorName };
    setNewColor((oldColors) => [...oldColors, newColor]);
    setColorName((colorName) => (colorName = ""));
  };
  const handleColorChange = (evt) => {
    setColorName(evt.target.value);
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
        <Typography variant="h4">Design Your Palette</Typography>
        <div>
          <Button variant="contained" color="secondary" onClick={clearColors}>
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={addRandomColor}
            disabled={paletteFull}
          >
            Random Color
          </Button>
        </div>
        <ChromePicker color={curColor} onChangeComplete={updateCurrentColor} />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            value={colorName}
            onChange={handleColorChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "This field is required!",
              "Color name must be unique!",
              "Color already use!",
            ]}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={paletteFull}
            style={{ backgroundColor: paletteFull ? "grey" : curColor }}
          >
            {paletteFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
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
