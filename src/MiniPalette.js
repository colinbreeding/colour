import React from "react";
import "./styles/MiniPalette.css";

function MiniPalette(props) {
  const { paletteName, emoji, colors } = props;
  const miniColorBoxes = colors.map((color) => (
    <div
      className="mini-color"
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ));
  return (
    <div className="mini-container" onClick={props.handleClick}>
      <div className="mini-colors">{miniColorBoxes}</div>
      <h5 className="mini-title">
        {paletteName}
        <span className="mini-emoji">{emoji}</span>
      </h5>
    </div>
  );
}

export default MiniPalette;
