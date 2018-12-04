import React, { Component } from 'react';
import './App.css';
import Toolbar from './Toolbar'
import MessageList from './MessageList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }
  //set the messages state 
  getMessageState = async () => {
    const response = await fetch('http://localhost:8082/api/messages')
    if (response.status === 200) {
      let json = await response.json()
      this.setState({
        ...this.state,
        messages: json
      })
    } else {
      console.log('I broke, response')
      throw new Error('I broke request')
    }
  }
  //did the component mount? maybe.
  async componentDidMount() {
    this.getMessageState()
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Toolbar />
          <MessageList messages={this.state.messages} />
        </div>
      </div>
    );
  }
}

export default App;
