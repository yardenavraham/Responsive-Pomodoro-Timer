import React from 'react';
import BreakInterval from './BreakInterval';
import SessionLength from './SessionLength';
import FlipClock from './FlipClock';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { Howl } from "howler";

const audio = {sound: ["http://soundbible.com/mp3/Button-SoundBible.com-1420500901.mp3"]};

class App extends React.Component {


  constructor() {
    super();

    this.state = {
      sessionLength: 25,
      breakLength: 5,
      timerMinute: 25,
      isPlay: false
    }

    this.onIncreaseBreakLength = this.onIncreaseBreakLength.bind(this);
    this.onDecreaseBreakLength = this.onDecreaseBreakLength.bind(this);
    this.onIncreaseSessionLength = this.onIncreaseSessionLength.bind(this);
    this.onDecreaseSessionLength = this.onDecreaseSessionLength.bind(this);
    this.onToggleInterval = this.onToggleInterval.bind(this);
    this.onDecreaseTimerMinute = this.onDecreaseTimerMinute.bind(this);
    this.onResetTimer = this.onResetTimer.bind(this);
    this.onPlayStopTimer = this.onPlayStopTimer.bind(this);
  }


  onIncreaseBreakLength() {
    this.setState((prevState) => {
      return {
        breakLength: prevState.breakLength + 1
      }
    })
  }

  onDecreaseBreakLength() {
    this.setState((prevState) => {
      return {
        breakLength: prevState.breakLength - 1
      }
    })
  }

  onIncreaseSessionLength() {
    this.setState((prevState) => {
      return {
        sessionLength: prevState.sessionLength + 1,
        timerMinute: prevState.timerMinute + 1
      }
    })
  }

  onDecreaseSessionLength() {
    this.setState((prevState) => {
      return {
        sessionLength: prevState.sessionLength - 1,
        timerMinute: prevState.timerMinute - 1
      }
    })
  }

  onDecreaseTimerMinute() {
    this.setState((prevState) => {
      return {
        timerMinute: prevState.timerMinute - 1,
      }
    })
  }

  onToggleInterval(isSession) {
    if (isSession) {
      this.setState({
        timerMinute: this.state.settionLength
      })
    } else { // there is a break
      {
        this.setState({
          timerMinute: this.state.breakLength
        })
      }
    }
  }

  onResetTimer() {
    this.setState({
      timerMinute: this.state.sessionLength
    })
  }

  onPlayStopTimer(isPlay) {
    this.setState({
      isPlay: isPlay

    })
  }

  clickSound = (src) => {

    const sound = new Howl({
      src,
      html5: true
    })
    sound.play();
  }


  render() {
    return (
      <div className="pomodoro-container">
        <div className="container">
          <h1>Pomodoro Timer</h1>
          <div className="row justify-content-center align-items-center">
            <BreakInterval
              clickSound={this.clickSound}
              isStart={this.state.isPlay}
              breakInterval={this.state.breakLength}
              increaseBreak={this.onIncreaseBreakLength}
              decreaseBreak={this.onDecreaseBreakLength} />
            <SessionLength
              clickSound={this.clickSound}
              audio = {this.audio}
              isStart={this.state.isPlay}
              sessionLength={this.state.sessionLength}
              increaseSession={this.onIncreaseSessionLength}
              decreaseSession={this.onDecreaseSessionLength} />
          </div>
          <FlipClock
            isStart={this.state.isPlay}
            timerMinute={this.state.timerMinute}
            breakLength={this.state.breakLength}
            decreaseTimerMinute={this.onDecreaseTimerMinute}
            toggleInterval={this.onToggleInterval}
            resetTimer={this.onResetTimer}
            onPlayStopTimer={this.onPlayStopTimer} />
        </div>
      </div>
    );
  }

}

export default App;


