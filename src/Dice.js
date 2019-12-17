import React, { Component } from "react";
import Die from "./Die";

class Dice extends Component {
  render() {
    return (
      <div className="Dice">
        {this.props.dice.map((die, idx) => (
          <Die
            value={die}
            locked={this.props.locked[idx]}
            idx={idx}
            key={idx}
            handleClick={this.props.handleClick}
          />
        ))}
      </div>
    );
  }
}

export default Dice;
