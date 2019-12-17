import React, { Component } from "react";

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
          />
        ))}
      </div>
    );
  }
}

export default Dice;
