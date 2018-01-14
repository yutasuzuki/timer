import React, { Component } from 'react'
import { render } from 'react-dom'
import { setInterval } from 'core-js/library/web/timers';

class App extends Component {
  constructor() {
    super()
    this.state = {
      time: 0,
      play: false,
      intervalID: ''
    }
    window.addEventListener('keyup', this.timerHandler.bind(this))
  }

  timerHandler(e) {
    if (e.keyCode === 32 && 0 < this.state.time) {
      if (this.state.play === false) {
        this.paly()
      } else {
        this.stop()
      }
    }
  }

  paly() {
    const intervalID = setInterval(() => {
      if (0 < this.state.time) {
        this.setState({time: this.state.time - 1})
      } else {
        this.stop()
      }
    }, 1000)
    this.setState({play: true, intervalID})
  }

  stop() {
    clearInterval(this.state.intervalID)
    this.setState({play: false, intervalID: ''})
  }

  changeTime(e) {
    this.setState({time: e.target.value});
  }

  render() {
    return (
      <div className='timer-container'>
        <input className='timer' type='number' value={this.state.time} onChange={this.changeTime.bind(this)}/>
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('content')
)