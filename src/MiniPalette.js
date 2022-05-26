import React from "react";
import './MiniPalette.css';

function MiniPalette(props) {
    const { paletteName, emoji, colors } = props;
    const miniColorBoxes = colors.map(color =>
        <div className='mini-color' style={{ backgroundColor: color.color }} key={color.name} />)
    return (
        <div className='mini-container'>
            <div className='mini-colors'>
                {miniColorBoxes}
            </div>
            <h5 className='mini-title'>{paletteName} <span className='mini-emoji'>{emoji}</span></h5>
        </div>
    )
}

export default MiniPalette;