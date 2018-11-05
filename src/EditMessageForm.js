import React, { Component } from 'react';


class EditMessageForm extends Component {

  state = {
    name: this.props.messageInfo.real_name,
    message: this.props.messageInfo.message
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.sendEditMessageFetchRequest(this.state.name, this.state.message, this.props.messageInfo.id)
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
          Edited Name:
          <input onChange={this.handleNameChange} value={this.state.name}type="text" name="name" />
          Edited Message:
          <input onChange={this.handleMessageChange} value={this.state.message} type="text" name="message" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

}

export default EditMessageForm;
