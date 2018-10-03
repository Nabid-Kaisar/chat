import React, { Component } from "react";
import "./styleChatApp.css";

export default class MessageContainer extends Component {
  render() {
    return (
      <div id={this.props.idProps} className="message-content">
        <p className="message-text">{this.props.inputValueText}</p>
      </div>
    );
  }
}
