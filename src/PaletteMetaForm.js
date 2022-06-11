import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import EmojiPicker from "./EmojiPicker";

function PaletteMetaForm(props) {
  const { paletteName, setPaletteName, hideForm, handleSubmit } = props;
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const handlePaletteChange = (evt) => {
    setPaletteName(evt.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={hideForm}>
      <DialogTitle>Choose A Palette Name</DialogTitle>
      <ValidatorForm onSubmit={() => handleSubmit(paletteName)}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new beautiful palette. Make Sure it is
            unique!
          </DialogContentText>
          <EmojiPicker />
          <TextValidator
            label="Palette Name"
            value={paletteName}
            name="paletteName"
            onChange={handlePaletteChange}
            fullWidth
            margin="normal"
            validators={["required", "isPaletteNameUnique"]}
            errorMessages={["Enter Palette Name", "Name already used"]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={hideForm}>Cancel</Button>
          <Button variant="contained" color="primary" type="submit">
            Save Palette
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}

export default PaletteMetaForm;
