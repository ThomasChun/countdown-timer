import React from 'react';

export default class TimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daysValue: 0,
      hoursValue: 0,
      minutesValue: 0,
      secondsValue: 0,
      totalSeconds: 0,
      running: false,
    }
  }

  updateDaysValue(event) {
    console.log(event.target.value, 'days');
    this.setState({
      daysValue: event.target.value,
      totalSeconds: ((event.target.value * 86400) + (this.state.hoursValue * 3600) + (this.state.minutesValue * 60) + (this.state.secondsValue * 1))
    })
  }

  updateHoursValue(event) {
    console.log(event.target.value, 'hours');
    this.setState({
      hoursValue: event.target.value,
      totalSeconds: ((this.state.daysValue * 86400) + (event.target.value * 3600) + (this.state.minutesValue * 60) + (this.state.secondsValue * 1))
    })
  }

  updateMinutesValue(event) {
    console.log(event.target.value, 'minutes');
    this.setState({
      minutesValue: event.target.value,
      totalSeconds: ((this.state.daysValue * 86400) + (this.state.hoursValue * 3600) + (event.target.value * 60) + (this.state.secondsValue * 1))
    })
  }

  updateSecondsValue(event) {
    this.setState({
      secondsValue: event.target.value,
      totalSeconds: ((this.state.daysValue * 86400) + (this.state.hoursValue * 3600) + (this.state.minutesValue * 60) + (event.target.value * 1))
    })
  }

  countdown() {
    if (this.state.totalSeconds > 0) {
      this.setState({
        totalSeconds: parseInt(this.state.totalSeconds - 1),
      })
    } else {
      clearInterval(this.timerID);
      this.setState({
        running: false,
      })
    }
    console.log(this.state.totalSeconds);
  }

  handleStart(running) {
    this.setState({
      running: !this.state.running,
    })
    if (this.state.running === true) {
      clearInterval(this.timerID);
    } else {
      this.timerID = setInterval(() => this.countdown(this.state.totalSeconds), 1000);
    }
  }

  handleReset() {
    clearInterval(this.timerID);
    document.getElementById('days').value = '';
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';
    this.setState({
      daysValue: 0,
      hoursValue: 0,
      minutesValue: 0,
      secondsValue: 0,
      totalSeconds: 0,
    })
  }

  render() {
    let totalSeconds = this.state.totalSeconds;
    let startBtn = '';
    this.state.running === true ? startBtn = 'Pause' : startBtn = 'Start'
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor((totalSeconds - (days * 86400)) / 3600);
    let minutes = Math.floor((totalSeconds - (days * 86400) - (hours * 3600)) / 60);
    let seconds = Math.floor((totalSeconds - (days * 86400) - (hours * 3600) - (minutes * 60)));

    let timeDisplay = '', daysText = '', hoursText = '', minText = '', secText='';
    days === 1 ? daysText = 'day' : daysText = 'days';
    hours === 1 ? hoursText = 'hour' : hoursText = 'hours';
    minutes === 1 ? minText = 'minute' : minText = 'minutes';
    seconds === 1 ? secText = 'second' : secText = 'seconds';

    if (totalSeconds === 0) {
      timeDisplay = 'Countdown Expired';
    } else if (days === 0 && hours === 0 && minutes === 0) {
      timeDisplay = `${seconds} ${secText}`;
    } else if (days === 0 && hours === 0) {
      timeDisplay = `${minutes} ${minText} ${seconds} ${secText}`;
    } else if (days === 0) {
      timeDisplay = `${hours} ${hoursText} ${minutes} ${minText} ${seconds} ${secText}`;
    } else {
      timeDisplay = `${days} ${daysText} ${hours} ${hoursText} ${minutes} ${minText} ${seconds} ${secText}`;
    }

    return (
      <div className='timeInputContainer'>
        <input className='days' id='days' type='number' min='0' placeholder='0' onChange={event => this.updateDaysValue(event)} required />
        <span> day(s)</span>
        <input className='hours' id='hours' type='number' min='0' max='24' placeholder='0' onChange={event => this.updateHoursValue(event)} required />
        <span> hours(s)</span>
        <input className='minutes' id='minutes' type='number' min='0' max='59' placeholder='0' onChange={event => this.updateMinutesValue(event)} required />
        <span> minutes(s)</span>
        <input className='seconds' id='seconds' type='number' min='0' max='59' placeholder='0' onChange={event => this.updateSecondsValue(event)} required />
        <span> seconds(s)</span>
        <div className='totalSecondsDisplay'>Total Seconds: {this.state.totalSeconds > 0 ? this.state.totalSeconds : 'Countdown Expired'}</div>
        <div className='timeDisplay'>{timeDisplay}</div>
        <button type='submit' onClick={() => this.handleStart(this.state.running)}>{startBtn}</button>
        <button type='submit' onClick={() => this.handleReset()}>Reset</button>
      </div>
    )
  }
}