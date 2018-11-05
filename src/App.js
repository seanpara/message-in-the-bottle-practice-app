import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Message from "./Message.js"
import MessageForm from "./MessageForm.js"
import EditMessageForm from "./EditMessageForm.js"
import ShowMessage from "./ShowMessage.js"



const apiUrl = "http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages"

let messageInfoProps

class App extends Component {

  state = {
    messages: [],
    editFormShown: false,
    showSelectedMessage: false
  }

  getMessages = () => {
    fetch(apiUrl)
    .then(r => r.json())
    .then( (messageRes) => {
      this.setState({
        messages: messageRes
      })
    })
  }

  componentDidMount(){
    this.getMessages()
  }

  renderNewMessageForm = () => {
    return (
      <MessageForm
      makeNewMessage={this.makeNewMessage}
      sendMessageEditInfoToForm={this.sendMessageEditInfoToForm}
      />
    )
  } // renders new message form

  makeNewMessage = (name, message) => {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        message: {message: message,
        real_name: name}
      })
    })
    .then(resp => this.getMessages())

  }// end of makeNewMessage`

  getMessageToEditInfo = (messageProps) => {
    messageInfoProps = messageProps
  }// send message info up to App when edit button is clicked on the message

  toggleEditForm = () => {
    if (!this.state.editFormShown){
      this.setState({
        editFormShown: true
      })
    }
    else if (this.state.editFormShown){
      this.setState({
        editFormShown: false
      })
    }
  } // changes form from new to edit or back

  renderEditForm = () => {
    return (
      <EditMessageForm
      sendEditMessageFetchRequest={this.sendEditMessageFetchRequest}
      messageInfo={messageInfoProps}
      />
    )
  }

  sendEditMessageFetchRequest = (editedName, editedMessage, messageId) => {
    console.log(editedName, editedMessage, messageId)
    fetch(`http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages/${messageId}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: {message: editedMessage,
        real_name: editedName }
      })
    })// end of PATCH fetch
    .then(r => r.json())
    .then((editRes) => {
      console.log(editRes);
      this.getMessages()
      this.toggleEditForm()
    })// rerender after edit

  }

  deleteMessage = (messageId) => {
    console.log(messageId);
    fetch(`http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages/${messageId}`, {method:"DELETE"})
    .then(r => r.json())
    .then((r) => {
      console.log(r)
      this.getMessages()
    })
  }// end of delete message fn



  toggleShowMessage = () => {
    if (!this.state.showSelectedMessage){
      this.setState({
        showSelectedMessage: true
      })
      }
      else if (this.state.showSelectedMessage) {
        this.setState({
          showSelectedMessage: false
        })
      }
  }

  selectedMessageToShow = (messageId) => {

    fetch(`http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages/${messageId}`)
    .then(r => r.json())
    .then((singleMessageRes) => {
      this.renderShowMessage(singleMessageRes)
    })
  }

  renderShowMessage = (messageObj) => {
    return <ShowMessage message={messageObj}/>
  }

  renderAllMessages = () => {
    let messageCounter = 0
    return this.state.messages.map((message) => {
      return <Message
              deleteMessage={this.deleteMessage}
              key={++messageCounter}
              message={message}
              getMessageToEditInfo={this.getMessageToEditInfo}
              toggleEditForm={this.toggleEditForm}
              selectedMessageToShow={this.selectedMessageToShow}
              toggleShowMessage={this.toggleShowMessage}
              />
    })
  }

  render() {
    return (
      <div className="App">
        <div>
        {this.state.editFormShown ? this.renderEditForm() : this.renderNewMessageForm()}
        </div><br></br>
        <div>{this.state.showSelectedMessage ? this.renderShowMessage() : null}</div>
        <div>{this.renderAllMessages()}</div>

      </div>
    );
  }
}

export default App;
