import React, { Component } from 'react'
import Message from './Message'

class MessageList extends Component {

  render() {
    if (this.props.messages.length > 0) {
      return (
        <span>
          {this.props.messages.map((x, y) => (
            <Message id={y} key={y} message={x} />
          ))}
        </span>
      );
    } else {
      return <span />;
    }
  }
}

export default MessageList