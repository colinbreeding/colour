import React from "react";
import PaletteMetaForm from "./PaletteMetaForm";
import "./styles/PaletteFormNav.css";
import { styled, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "64px",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function PaletteFormNav(props) {
  const theme = useTheme();
  const { open, palettes, handleSubmit, paletteName, setPaletteName } = props;

  const [formShowing, setFormShowing] = React.useState(false);

  const showForm = () => {
    setFormShowing(true);
  };
  const hideForm = () => {
    setFormShowing(false);
  };
  return (
    <div className="root">
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create A Palette
          </Typography>
        </Toolbar>
        <div className="navBtns">
          <Link to="/" className="link">
            <Button variant="contained" color="secondary" className="navButton">
              Go Back
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            className="navButton"
            onClick={showForm}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={palettes}
          handleSubmit={handleSubmit}
          paletteName={paletteName}
          setPaletteName={setPaletteName}
          hideForm={hideForm}
        />
      )}
    </div>
  );
}

export default PaletteFormNav;
