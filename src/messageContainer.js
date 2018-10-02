import React, { Component } from "react";
// import "./styleChatApp.css";

export default class MessageContainer extends Component {
  render() {
    return (
      <div className="style-box message-content">
        <p>{this.props.inputValueText}</p>
      </div>
    );
  }
}
