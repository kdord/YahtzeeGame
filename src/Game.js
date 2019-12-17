import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      rolling: false,
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
    console.log(this.state);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.animateRoll = this.animateRoll.bind(this);
  }

  componentDidMount() {
    this.animateRoll();
  }
  animateRoll() {
    this.setState({ rolling: true }, () => {
      setTimeout(this.roll, 1000);
    });
  }
  toggleLocked(idx) {
    console.log(idx);
    if (this.state.rollsLeft > 0 && !this.state.rolling) {
      this.setState(currState => ({
        locked: [
          ...currState.locked.slice(0, idx),
          !currState.locked[idx],
          ...currState.locked.slice(idx + 1)
        ]
      }));
    }
  }

  roll(evt) {
    //roll dice whose indexes are in reroll
    this.setState(currState => ({
      dice: currState.dice.map((die, idx) =>
        currState.locked[idx] ? die : Math.ceil(Math.random() * 6)
      ),
      locked:
        currState.rollsLeft > 1 ? currState.locked : Array(NUM_DICE).fill(true),
      rollsLeft: currState.rollsLeft - 1,
      rolling: false
    }));
  }
  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false)
    }));
    this.roll();
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
              disabled={this.state.rollsLeft === 0}
              rolling={this.state.rolling}
            />
            <div className="Game-button-wrapper">
              <button
                className="Game-reroll"
                onClick={this.animateRoll}
                disabled={
                  this.state.locked.every(x => x) || this.state.rollsLeft === 0
                }
              >
                {this.state.rollsLeft} Rerolls Left
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />
      </div>
    );
  }
}

export default Game;
