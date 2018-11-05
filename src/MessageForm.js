import React, { Component } from 'react';


class MessageForm extends Component {

  state = {
    name: "",
    message:""
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.makeNewMessage(this.state.name, this.state.message)
    event.target.reset()
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleMessageChange = (event) => {
    this.setState({
      message: event.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input onChange={this.handleNameChange} type="text" name="name" />
          Message:
          <input onChange={this.handleMessageChange} type="text" name="message" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

}

export default MessageForm;
