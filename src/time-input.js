import React from 'react';
import TimeDisplay from './time-display';

export default class TimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daysValue: 0,
      hoursValue: 0,
      minutesValue: 0,
      selectedTime: [],
    }
  }

  updateDaysValue(event) {
    console.log(event.target.value, 'days');
    this.setState({
      daysValue: event.target.value,
    })
  }

  updateHoursValue(event) {
    console.log(event.target.value, 'hours');
    this.setState({
      hoursValue: event.target.value,
    })
  }

  updateMinutesValue(event) {
    console.log(event.target.value, 'minutes');
    this.setState({
      minutesValue: event.target.value,
    })
  }

  handleSubmit(event, days, hours, minutes) {
    event.preventDefault();
    let daysText = '', hoursText = '', minText = '';
    days === '1' ? daysText = 'day' : daysText = 'days';
    hours === '1' ? hoursText = 'hour' : hoursText = 'hours';
    minutes === '1' ? minText = 'minute' : minText = 'minutes';
    console.log(`${days} ${daysText} ${hours} ${hoursText} ${minutes} ${minText}`);
    this.setState({
      selectedTime: parseInt((days * 86400) + (hours * 3600) + (minutes * 60)),
    })
  }

  handleStart() {
    console.log('start clicked');
  }

  render() {
    return (
      <div>
        <input className='Days' type='number' min='0'  onChange={event => this.updateDaysValue(event)} required />
        <span>day(s)</span>
        <input className='Hours' type='number' min='0'  onChange={event => this.updateHoursValue(event)} required />
        <span>hours(s)</span>
        <input className='Minutes' type='number' min='0'  onChange={event => this.updateMinutesValue(event)} required />
        <span>minutes(s)</span>
        <button type='submit' onClick={(event) => this.handleSubmit(event, this.state.daysValue, this.state.hoursValue, this.state.minutesValue)}>Set Timer</button>
        <TimeDisplay time={this.state.selectedTime} />
      </div>
    )
  }
}