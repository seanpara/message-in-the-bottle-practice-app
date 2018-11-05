import React, { Component } from 'react';

class Message extends Component {


  handleDeleteClick = () => {
    const messageId = this.props.message.id
    this.props.deleteMessage(messageId)

  }

  handleEditClick = () => {
    this.props.getMessageToEditInfo(this.props.message)
    this.props.toggleEditForm()
  }


  render(){
    return(
      <>
      <p
      data-id={`${this.props.message.id}`}
      >
      Name: {this.props.message.real_name},
      Message: {this.props.message.message}
      </p>
      <button onClick={this.handleDeleteClick} >Delete</button>
      <button onClick={this.handleEditClick}>Edit</button>

      </>
    )

  }
}


export default Message;
