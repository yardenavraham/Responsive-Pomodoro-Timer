import React from 'react';
import { FaPlay } from "react-icons/fa"
import { FaStop } from "react-icons/fa"
import { MdRefresh } from "react-icons/md"
import { IoReload } from "react-icons/io5"



class Timer extends React.Component {
    constructor() {
        super();

        this.state = {
            isSession: true,
            timerSecond: 0,
            intervalId: 0
        }

        this.decreaseTimer = this.decreaseTimer.bind(this);
        this.playTimer = this.playTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
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
        return (
            <section>
                <section className="timer-container">
                    <h4>{this.state.isSession === true ? "Session" : "Break"}</h4>
                    <span className="timer">{this.props.timerMinute}</span>
                    <span className="timer">:</span>
                    <span className="timer">{this.state.timerSecond === 0 ? "00" : this.state.timerMinute < 10 ? "0" + this.state.timerSecond : this.state.timerSecond}</span>
                </section>
                <section id="cool-buttons" className="interval-container">
                    <button type="button" className="btn btn-outline-dark actions-btn" onClick={this.playTimer}><FaPlay/></button>
                    <button type="button" className="btn btn-outline-dark actions-btn" onClick={this.stopTimer}><FaStop/></button>
                    <button type="button" className="btn btn-outline-dark actions-btn" font-size="3rem" onClick={this.resetTimer}><IoReload/></button>
                </section>
            </section>


        );
    }
}

export default Timer;