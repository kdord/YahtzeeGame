import React, { Component } from "react";
import Dice from "./Dice";

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
    this.toggleLocked = this.toggleLocked.bind(this);
  }
  toggleLocked(idx) {
    this.setState(currState => ({
      locked: [
        ...currState.locked.slice(0, idx),
        !currState.locked[idx],
        ...currState.locked.slice(idx + 1)
      ]
    }));
  }

  render() {
    return (
      <div className="Game">
        <header className="Game-header">
          <h1>Yahtzee!</h1>
          <section className="Game-dice-section">
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              handleClick={this.toggleLocked}
            />
          </section>
        </header>
      </div>
    );
  }
}

export default Game;
