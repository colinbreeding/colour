import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles/DraggableColorBox.css";

export default function DraggableColorBox(props) {
  const { handleClick, name, color } = props;
  return (
    <div className="draggableColorBox" style={{ backgroundColor: color }}>
      <div className="boxContent">
        <span>{name}</span>
        <DeleteIcon className="deleteIcon" onClick={handleClick} />
      </div>
    </div>
  );
}
