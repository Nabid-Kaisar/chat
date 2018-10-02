import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.state = {
      message: "hello..."
    };
  }

  sendMessage(event) {
    this.setState({ message: (event.target.value)});
    console.log(this.state.message);
  }

  showMessage(event) {
    console.log(this.state.message);
  }

  render() {
    return (
      <div className="App">
        <div className="chat-container">
          <h1>Hello</h1>
          <div className="message-container">
            <p>{this.state.message}</p>
          </div>
          <div className="message-send-box">
            <input
              type="text"
              // onChange={this.showMessage}
              value={this.state.value}
            />
            <button onClick={this.sendMessage}>Send</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
