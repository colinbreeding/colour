import React from "react";
import "./styles/DraggableColorBox.css";

export default function DraggableColorBox(props) {
  return (
    <div className="draggableColorBox" style={{ backgroundColor: props.color }}>
      {props.color}
    </div>
  );
}
