import React from "react";
import './MiniPalette.css';

function MiniPalette(props) {
    const { paletteName, emoji } = props;
    return (
        <div className='mini-container'>
            <div className='mini-colors'>

            </div>
            <h5 className='mini-title'>{paletteName} <span className='mini-emoji'>{emoji}</span></h5>
        </div>
    )
}

export default MiniPalette;