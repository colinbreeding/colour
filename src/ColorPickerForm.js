import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "./styles/ColorPickerForm.css";

function ColorPickerForm(props) {
  const [curColor, setColor] = useState("teal");
  const { paletteFull, colors, colorName, setColorName } = props;

  useEffect(() => {
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
  });

  const updateCurrentColor = (newColor) => {
    setColor(newColor.hex);
  };
  const handleColorChange = (evt) => {
    setColorName(evt.target.value);
  };
  const handleSubmit = () => {
    const newColor = { color: curColor, name: colorName };
    props.addNewColor(newColor);
    setColorName("");
  };

  return (
    <div>
      <ChromePicker
        color={curColor}
        onChangeComplete={updateCurrentColor}
        className="picker"
      />
      <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
        <TextValidator
          value={colorName}
          name="newColorName"
          className="colorNameInput"
          placeholder="Color Name"
          variant="filled"
          margin="normal"
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
          className="addColor"
          disabled={paletteFull}
          style={{ backgroundColor: paletteFull ? "grey" : curColor }}
        >
          {paletteFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColorPickerForm;
