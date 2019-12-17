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
    this.roll = this.roll.bind(this);
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

  roll(evt) {
    //roll dice whose indexes are in reroll
    this.setState(currState => ({
      dice: currState.dice.map((die, idx) =>
        currState.locked[idx] ? die : Math.ceil(Math.random() * 6)
      ),
      locked:
        currState.rollsLeft > 1 ? currState.locked : Array(NUM_DICE).fill(true),
      rollsLeft: currState.rollsLeft - 1
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
            <div className="Game-button-wrapper">
              <button
                className="Game-rerol"
                onClick={this.roll}
                disabled={this.state.locked.every(x => x)}
              >
                {this.state.rollsLeft} Rerolls Left
              </button>
            </div>
          </section>
        </header>
      </div>
    );
  }
}

export default Game;
