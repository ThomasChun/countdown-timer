import React from 'react';

export default class TimeDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSeconds: this.props.time,
    }
  }
  
  componentDidMount() {
    this.setState({
      totalSeconds: this.props.time,
    })
  }

  handleStart() {
    this.timerID = setInterval(() => this.countdown(this.state.totalSeconds), 1000);
    console.log('run');
  }

  handleReset() {
    clearInterval(this.timerID);
    this.setState({
      totalSeconds: 0,
    })
  }

  countdown(totalSeconds) {
    console.log('tick', totalSeconds);
    this.setState({
      totalSeconds: parseInt(totalSeconds + 1),
    })
  }

  render() {
    let totalTime = this.props.time;
    let displayCountdown = totalTime - this.state.totalSeconds > 0 ? (totalTime - this.state.totalSeconds) : 0;
    return (
      <div>
        <b>{displayCountdown}</b>
        <button type='submit' onClick={() => this.handleStart()}>Start</button>
        <button type='submit' onClick={() => this.handleReset()}>Reset</button>
      </div>
    )
  }
}