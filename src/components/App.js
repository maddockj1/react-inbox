import React, { Component } from "react"
import "./App.css"
import Toolbar from "./Toolbar"
import MessageList from "./MessageList"
import Compose from "./Compose"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }
  toggleProperty(message, property) {
    const idx = this.state.messages.indexOf(message)
    this.setState({
      messages: [
        ...this.state.messages.slice(0, idx),
        { ...message, [property]: !message[property] },
        ...this.state.messages.slice(idx + 1)
      ]
    })
  }

  updateMessages = async (body) => {
    body = JSON.stringify(body)
    return await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: body
    })
  }

  starUpdateCallback = (message) => {
    const messageCopy = { ...message }
    messageCopy.starred === true ? messageCopy.starred = false : messageCopy.starred = true
    return this.updateMessages({
      "messageIds": [messageCopy.id],
      "command": "star",
      "star": [messageCopy.starred]
    })
  }

  readUpdateCallback = () => {
    this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "read",
      "read": true
    })
  }

  toggleSelect(message) {
    this.toggleProperty(message, "selected")
  }

  toggleStar(message) {
    this.toggleProperty(message, "starred")
    this.starUpdateCallback(message)
  }

  markAsRead() {
    this.setState({
      messages: this.state.messages.map(message =>
        message.selected ? { ...message, read: true } : message
      )
    })
    this.readUpdateCallback()
  }

  unreadUpdateCallback = () => {
    this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "read",
      "read": false
    })
  }

  markAsUnread() {
    this.setState({
      messages: this.state.messages.map(message =>
        message.selected ? { ...message, read: false } : message
      )
    })
    this.unreadUpdateCallback()
  }

  deleteUpdateCallback = () => {
    this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "delete"
    })
  }

  deleteMessages() {
    const messages = this.state.messages.filter(message => message.selected)
    this.setState({ messages })
    this.deleteUpdateCallback()
  }

  toggleSelectAll() {
    const selectedMessages = this.state.messages.filter(
      message => message.selected
    )
    const selected = selectedMessages.length !== this.state.messages.length
    this.setState({
      messages: this.state.messages.map(message =>
        message.selected !== selected ? { ...message, selected } : message
      )
    })
  }

  labelAddUpdateCallback = (label) => {
    this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "addLabel",
      "label": label
    })
  }
  applyLabel(label) {
    const messages = this.state.messages.map(message =>
      message.selected && !message.labels.includes(label)
        ? { ...message, labels: [...message.labels, label].sort() }
        : message
    )
    this.setState({ messages })
    this.labelAddUpdateCallback(label)
  }

  labelRemoveUpdateCallback = (label) => {
    this.updateMessages({
      "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
      "command": "removeLabel",
      "label": label
    })
  }

  removeLabel(label) {
    const messages = this.state.messages.map(message => {
      const idx = message.labels.indexOf(label)
      if (message.selected && idx > -1) {
        return {
          ...message,
          labels: [
            ...message.labels.slice(0, idx),
            ...message.labels.slice(idx + 1)
          ]
        }
      }
      return message
    })
    this.setState({ messages })
    this.labelRemoveUpdateCallback()
  }
  //Composeing new messages etc etc
  openComposeCallback = () => this.setState({ compose: !this.state.compose })

  composeMessageCallback = async post => {
    let body = {
      subject: post.subject,
      body: post.body
    }
    await fetch("http://localhost:8082/api/messages", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    this.openComposeCallback()
    this.getMessageState()
  }
  //set the messages state
  getMessageState = async () => {
    const response = await fetch("http://localhost:8082/api/messages")
    if (response.status === 200) {
      let json = await response.json()
      this.setState({
        ...this.state,
        messages: json
      })
    } else {
      console.log("I broke, response")
      throw new Error("I broke request")
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
          <Toolbar
            messages={this.state.messages}
            openComposeCallback={this.openComposeCallback.bind(this)}
            markAsRead={this.markAsRead.bind(this)}
            markAsUnread={this.markAsUnread.bind(this)}
            toggleSelectAll={this.toggleSelectAll.bind(this)}
            deleteMessages={this.deleteMessages.bind(this)}
            applyLabel={this.applyLabel.bind(this)}
            removeLabel={this.removeLabel.bind(this)}
          />
          {this.state.compose ? (
            <Compose composeMessageCallback={this.composeMessageCallback} />
          ) : (
              false
            )}
          <MessageList
            messages={this.state.messages}
            toggleSelect={this.toggleSelect.bind(this)}
            toggleStar={this.toggleStar.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default App
