import React, { Component } from 'react';

class Message extends Component {

  state = {
    messageBeingShow: false
  }

  handleDeleteClick = () => {
    const messageId = this.props.message.id
    this.props.deleteMessage(messageId)

  }

  handleEditClick = () => {
    this.props.getMessageToEditInfo(this.props.message)
    // this.props.toggleEditForm()
  }

  hideAndShowMessageInList = () => {
    if (!this.state.messageBeingShow){
      this.setState({
        messageBeingShow: true
      })
    }
    else if (this.state.messageBeingShow) {
      this.setState({
        messageBeingShow: false
      })
    }
  }
  handleShowClick = () => {
    this.props.selectedMessageToShow(this.props.message.id)
    this.hideAndShowMessageInList()
    this.props.toggleShowMessage()
  }

  renderMessage = () => {

    if (this.state.messageBeingShow === false ){
      return (
        <>
        <p
        data-id={`${this.props.message.id}`}
        >
        Name: {this.props.message.real_name},
        Message: {this.props.message.message}
        </p>
        <button onClick={this.handleDeleteClick} >Delete</button>
        <button onClick={this.handleEditClick}>Edit</button>
        <button onClick={this.handleShowClick}>Show This Message Up Top!</button>

        </>
      )
    }
    else if (this.state.messageBeingShow === true ) {
      return null
    }




  }


  render(){
    return (
      <>{ this.renderMessage()} </>
    )


  }
}


export default Message;
