import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var Sentiment = require('sentiment');

var sentiment = new Sentiment();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      toastValue: ''
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <input type="text" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} />
        </p>
        <p className="App-intro">
          Input: {this.state.inputValue}
        </p>
        <p className="App-intro">
          How many toasts: {this.state.toastValue}
        </p>
      </div>
    );
  }

  updateInputValue(evt) {
    console.log(evt.target.value);
    var score = sentiment.analyze(evt.target.value).comparative;
    var toastScore = this.scoreToToast(score);
    this.setState({
      inputValue: evt.target.value,
      toastValue: toastScore
    });
  }

  scoreToToast(score) {
    var toasts = "1 toast";
    if(score > 0 && score < 1){
      toasts = "No toast required";
    } else if (score < 0 && score > -1){
      toasts = "Many toasts, best toasts, required.";
    }
    return toasts;
  }
}

export default App;
