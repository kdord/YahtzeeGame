import React, { Component } from "react";
import Die from "./Die";
import "./Dice.css";

class Dice extends Component {
  render() {
    return (
      <div className="Dice">
        {this.props.dice.map((die, idx) => (
          <Die
            val={die}
            locked={this.props.locked[idx]}
            idx={idx}
            key={idx}
            handleClick={this.props.handleClick}
            disabled={this.props.disabled}
          />
        ))}
      </div>
    );
  }
}

export default Dice;
