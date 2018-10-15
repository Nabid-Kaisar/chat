import React, { Component } from 'react';

import './TitleBarStyle.css';

class TitleBar extends Component {
  render() {
    return (
      <div>
      <div>
      <div className="titleBar">
        <p className = "titleText">Public Chat</p>
        <p className = "titleFoot">Speak Your mind to everybody..</p>
      </div>
      </div>
      </div>
    );
  }
}

export default TitleBar;
