import React, { Component } from "react";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };
  }

  render() {
    return (
      <div className="Game">
        <header className="Game-header">
          <h1>Yahtzee!</h1>
          <section className="Game-dice-section">
            <Dice dice={this.state.dice} locked={this.state.locked} />
          </section>
        </header>
      </div>
    );
  }
}

export default Game;
