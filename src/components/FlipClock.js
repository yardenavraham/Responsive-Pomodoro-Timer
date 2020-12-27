

import React from 'react';
import '../FlipClock.css';
import { FaPlay } from "react-icons/fa"
import { FaStop } from "react-icons/fa"
import { IoReload } from "react-icons/io5"


// function component
const AnimatedCard = ({ animation, digit }) => {
  return (
    <div className={`flipCard ${animation}`}>
      <span>{digit}</span>
    </div>
  );
};

// function component
const StaticCard = ({ position, digit }) => {
  return (
    <div className={position}>
      <span>{digit}</span>
    </div>
  );
};

// function component
const FlipUnitContainer = ({ digit, shuffle, unit }) => {

  // assign digit values
  let currentDigit = digit;
  let previousDigit = digit + 1;

  // // to prevent a negative value
  // if (unit !== 'hours') {
  //   previousDigit = previousDigit === -1
  //     ? 59
  //     : previousDigit;
  // } else {
  //   previousDigit = previousDigit === -1
  //     ? 23
  //     : previousDigit;
  // }

  // add zero
  if (currentDigit < 10) {
    currentDigit = `0${currentDigit}`;
  }
  if (previousDigit < 10) {
    previousDigit = `0${previousDigit}`;
  }

  // shuffle digits
  const digit1 = shuffle
    ? previousDigit
    : currentDigit;
  const digit2 = !shuffle
    ? previousDigit
    : currentDigit;

  // shuffle animations
  const animation1 = shuffle
    ? 'fold'
    : 'unfold';
  const animation2 = !shuffle
    ? 'fold'
    : 'unfold';

  return (
    <div className={'flipUnitContainer'}>
      <StaticCard
        position={'upperCard'}
        digit={currentDigit}
      />
      <StaticCard
        position={'lowerCard'}
        digit={previousDigit}
      />
      <AnimatedCard
        digit={digit1}
        animation={animation1}
      />
      <AnimatedCard
        digit={digit2}
        animation={animation2}
      />
    </div>
  );
};

// class component
class FlipClock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSession: true,
      timerSecond: 0,
      intervalId: 0,
      minutesShuffle: true,
      secondsShuffle: true
    }

    this.decreaseTimer = this.decreaseTimer.bind(this);
    this.playTimer = this.playTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.updateTime(),
      50
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateTime() {
    // set time units
    const minutes = this.props.timerMinute;
    const seconds = this.state.timerSecond;
    // on minute chanage, update minutes and shuffle state
    if (minutes !== this.state.minutes) {
      const minutesShuffle = !this.state.minutesShuffle;
      this.setState({
        minutes,
        minutesShuffle
      });
    }
    // on second chanage, update seconds and shuffle state
    if (seconds !== this.state.seconds) {
      const secondsShuffle = !this.state.secondsShuffle;
      this.setState({
        seconds,
        secondsShuffle
      });
    }
  }

  playTimer() {
    let intervalId = setInterval(this.decreaseTimer, 1000)
    this.props.onPlayStopTimer(true);
    this.setState({
      intervalId: intervalId
    })
  }

  decreaseTimer() {
    switch (this.state.timerSecond) {
      case 0:
        if (this.props.timerMinute === 0) {
          if (this.state.isSession) {
            this.setState({
              isSession: false
            });

            this.props.toggleInterval(this.state.isSession);
          } else {
            this.setState({
              isSession: true
            });

            this.props.toggleInterval(this.state.isSession);

          }

        } else {
          this.props.decreaseTimerMinute()
          this.setState({
            timerSecond: 59
          })
        }

        break;
      default:
        this.setState((prevState) => {
          return {
            timerSecond: prevState.timerSecond - 1
          }
        })
        break;

    }

  }

  stopTimer() {
    clearInterval(this.state.intervalId); //Stop the time
    this.props.onPlayStopTimer(false);
  }

  resetTimer() {
    this.stopTimer();
    this.props.resetTimer();
    this.props.onPlayStopTimer(false);
    this.setState({
      timerSecond: 0,
      isSession: true
    })
  }


  render() {
    // state object destructuring
    const {
      minutes,
      seconds,
      minutesShuffle,
      secondsShuffle
    } = this.state;

    return (
      <div>
        <h4>{this.state.isSession === true ? "Session" : "Break"}</h4>
        <div className={'flipClock'}>
          <FlipUnitContainer
            unit={'minutes'}
            digit={minutes}
            shuffle={minutesShuffle}
          />
          <FlipUnitContainer
            unit={'seconds'}
            digit={seconds}
            shuffle={secondsShuffle}
          />
        </div>
        <div id="cool-buttons" className="interval-container">
          <button type="button" className="btn btn-outline-dark actions-btn" onClick={this.playTimer}><FaPlay /></button>
          <button type="button" className="btn btn-outline-dark actions-btn" onClick={this.stopTimer}><FaStop /></button>
          <button type="button" className="btn btn-outline-dark actions-btn" font-size="3rem" onClick={this.resetTimer}><IoReload /></button>
        </div>
      </div>
    );
  }
}

export default FlipClock;




