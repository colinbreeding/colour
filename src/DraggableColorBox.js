import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles/DraggableColorBox.css";

export default function DraggableColorBox(props) {
  return (
    <div className="draggableColorBox" style={{ backgroundColor: props.color }}>
      <div className="boxContent">
        <span>{props.name}</span>
        <DeleteIcon className="deleteIcon" />
      </div>
    </div>
  );
}
