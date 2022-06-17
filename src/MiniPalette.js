import React, { PureComponent } from "react";
import "./styles/MiniPalette.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { render } from "@testing-library/react";

class MiniPalette extends PureComponent {
  constructor(props) {
    super(props);
    this.deletePalette = this.deletePalette.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  deletePalette(e) {
    e.stopPropagation();
    this.props.openDialog(this.props.id);
  }
  handleClick() {
    this.props.goToPalette(this.props.id);
  }
  render() {
    const { paletteName, emoji, colors, handleClick, id } = this.props;
    const miniColorBoxes = colors.map((color) => (
      <div
        className="mini-color"
        style={{ backgroundColor: color.color }}
        key={color.name}
      />
    ));
    return (
      <div className="mini-container" onClick={this.handleClick}>
        <DeleteIcon
          className="delete-icon"
          style={{ transition: "all 0.3s ease-in-out" }}
          onClick={this.deletePalette}
        />
        <div className="mini-colors">{miniColorBoxes}</div>
        <h5 className="mini-title">
          {paletteName}
          <span className="mini-emoji">{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default MiniPalette;
