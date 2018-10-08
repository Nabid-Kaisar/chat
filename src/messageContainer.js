import React, { Component } from "react";
import "./styleChatApp.css";

export default class MessageContainer extends Component {
  render() {
    //console.log("comp1", this.props.inputValueText);
    return (
      <div id={this.props.idProps} className="message-content">
        <div className="message-text-holder"><p className="message-text">{this.props.inputValueText.text}</p></div>
        <div className="message-time-holder"><p className="message-time">{this.props.inputValueText.dateTime}</p></div>
      </div>
    );
  }
}


// <h6 className="message-time">{this.props.inputValueText.dateTime}</h6>
