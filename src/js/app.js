import React, { Component } from 'react'
import { render } from 'react-dom'
import audioLoader from 'webaudio-buffer-loader'
import { setInterval } from 'core-js/library/web/timers';

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const backgroundImages = [
  'https://images.unsplash.com/photo-1490596541415-5afadbfbbf02',
  'https://images.unsplash.com/photo-1465588042420-47a53c2d0320',
  'https://images.unsplash.com/photo-1440558547120-1c1cae0397a1',
  'https://images.unsplash.com/photo-1504271863819-d279190bf871',
  'https://images.unsplash.com/photo-1515529112721-c52c4bcb4f87',
  'https://images.unsplash.com/photo-1484151709479-3996843263cf',
  'https://images.unsplash.com/photo-1440549770084-4b381ce9d988',
  'https://images.unsplash.com/photo-1496297679486-1a1607669129',
  'https://images.unsplash.com/photo-1500644970114-4ff3c3dfb61f',
  'https://images.unsplash.com/photo-1489289827069-adf270f4f417'
]

function random(min = 0, max = 100) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function audio(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    
    request.onload = function() {
      audioContext.decodeAudioData(
        request.response,
        function(buffer) {
          resolve(buffer)
        },
        function(error) {
          reject(error)
        }
      );
    }
    request.send();
  })
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      time: 0,
      play: false,
      intervalID: '',
      backgroundImage: backgroundImages[random(0, 9)],
      bufferSource: ''
    }

    audio('./bell.mp3').then((buffer) => {
      var source = audioContext.createBufferSource();
      this.setState({bufferSource: source})
      this.state.bufferSource.buffer = buffer;
      this.state.bufferSource.connect(audioContext.destination);
    })

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
        this.state.bufferSource.start(0)
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
<<<<<<< HEAD
      <div className='timer-container' style={{'backgroundImage': `url(${this.state.backgroundImage}?auto=format&fit=crop&w=1618&q=80)`}}>
        <input className='timer' type='text' value={this.state.time} onChange={this.changeTime.bind(this)}/>
=======
      <div className='timer-container' style={{'backgroundImage': `url(https://images.unsplash.com/photo-1484151709479-3996843263cf?auto=format&fit=crop&w=1618&q=80)`}}>
        <input className='timer' type='number' value={this.state.time} onChange={this.changeTime.bind(this)}/>
>>>>>>> master
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('content')
)