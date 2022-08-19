import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/MiniColorBox.css";

export default function MiniColorBox(props) {
  const { handleClick, name, color } = props;
  return (
    <div className="miniColorBox" style={{ backgroundColor: color }}>
      <div className="boxContent">
        <span>{name}</span>
        <DeleteIcon className="deleteIcon" onClick={handleClick} />
      </div>
    </div>
  );
}
