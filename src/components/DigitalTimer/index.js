// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isStart: false, minutes: 25, seconds: 0}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecrement = () => {
    const {minutes} = this.state
    if (minutes > 1) {
      this.setState(prevState => ({minutes: prevState.minutes - 1}))
    }
  }

  onIncrememt = () => {
    this.setState(prevState => ({minutes: prevState.minutes + 1}))
  }

  onReset = () => {
    this.setState({minutes: 25, seconds: 0, isStart: false})
    this.clearTimerInterval()
  }

  incrementTimeElapsedInSeconds = () => {
    const {minutes, seconds} = this.state
    const isTimeCompleted = seconds === minutes * 60
    if (isTimeCompleted) {
      this.clearTimerInterval()
      this.setState({isStart: false})
    } else {
      this.setState(prevState => ({seconds: prevState.seconds + 1}))
    }
  }

  onClickStatrtOrPause = () => {
    const {minutes, seconds, isStart} = this.state
    const isTimeCompleted = seconds === minutes * 60
    if (isTimeCompleted) {
      this.setState({seconds: 0})
    }
    if (isStart) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isStart: !prevState.isStart}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {minutes, seconds} = this.state
    const remainingSeconds = minutes * 60 - seconds
    const min = Math.floor(remainingSeconds / 60)
    const sec = Math.floor(remainingSeconds % 60)
    const strigifiedMinutes = min > 9 ? min : `0${min}`
    const strigifiedSeconds = sec > 9 ? sec : `0${sec}`
    return `${strigifiedMinutes}:${strigifiedSeconds}`
  }

  render() {
    const {isStart, minutes, seconds} = this.state
    const isButtonsDisabled = seconds > 0
    const startOrPauseImageUrl = isStart
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isStart ? 'pause icon' : 'play icon'
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="both-container">
          <div className="time-enclapsed-bg-con">
            <div className="round-shape">
              <h1 className="time-in-min">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="running">{isStart ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="pause-start-con">
            <div className="start-pause-card">
              <div className="start-con">
                <button
                  onClick={this.onClickStatrtOrPause}
                  type="button"
                  className="start-button"
                >
                  <img
                    src={startOrPauseImageUrl}
                    alt={startOrPauseAltText}
                    className="start-img"
                  />
                  <p className="start-name">{isStart ? 'Pause' : 'Start'}</p>
                </button>
              </div>
              <div className="reset-con">
                <button
                  onClick={this.onReset}
                  type="button"
                  className="start-button"
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="start-img"
                  />
                  <p className="start-name">Reset</p>
                </button>
              </div>
            </div>
            <p className="des">Set Timer Limit</p>
            <div className="increase-dec-con">
              <button
                onClick={this.onDecrement}
                disabled={isButtonsDisabled}
                className="button"
                type="button"
              >
                -
              </button>
              <p className="num">{minutes}</p>
              <button
                disabled={isButtonsDisabled}
                onClick={this.onIncrememt}
                className="button"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
