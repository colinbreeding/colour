import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles/PaletteList.css";
import MiniPalette from "./MiniPalette";

class PaletteList extends Component {
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    const { palettes, deletePalette } = this.props;
    return (
      <div className="PaletteList-root">
        <div className="PaletteList-container">
          <nav className="PaletteList-nav">
            <h1>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <div className="PaletteList-palettes">
            {palettes.map((palette) => (
              <MiniPalette
                {...palette}
                handleClick={() => this.goToPalette(palette.id)}
                handleDelete={deletePalette}
                key={palette.id}
                id={palette.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default PaletteList;
