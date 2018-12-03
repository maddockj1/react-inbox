import React, { Component } from 'react';
import './App.css';
import Toolbar from './Toolbar'
import MessageList from './MessageList'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages:[]
    }
  }
 async componentDidMount(){
  const response = await fetch("http://localhost:8082/api/messages")
    const json = await response.json()
    //waiting on API
    this.setState({ messages: json })
 }
  render() {
    return (
      <div className="App">
      <div className = "container">
       <Toolbar/> 
       <MessageList messages = {this.state.messages} />
      </div>
      </div>
    );
  }
}

export default App;
