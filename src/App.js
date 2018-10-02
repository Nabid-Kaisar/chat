import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
// import "./styleChatApp.css";
import Comp1 from "./messageContainer.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.inputHandler = this.inputHandler.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.state = {
      inputArray: [],
      inputText: ""
    };
  }

  inputHandler(inputValue) {
    this.setState({ inputText: inputValue.target.value });
  }

  eventHandler() {
    this.setState({
      inputArray: [...this.state.inputArray, this.state.inputText]
    });
    console.log(this.state.inputText);
  }

  render() {
    const showMessage = this.state.inputArray.map(item => {
      return <Comp1 inputValueText={item} />;
    });
    return (
      <div className="App">
        <div className="chat-container">
          {showMessage}
          <input
            className="style-box"
            type="text"
            onChange={this.inputHandler}
          />
          <button className="style-box" onClick={this.eventHandler}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default App;
