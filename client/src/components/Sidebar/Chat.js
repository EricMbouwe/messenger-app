import React, { Component } from 'react';
import { Box } from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { withStyles } from '@material-ui/core/styles';
import { setActiveChat } from '../../store/activeConversation';
import { connect } from 'react-redux';
import { updateReadStatus } from '../../store/utils/thunkCreators';

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
};

class Chat extends Component {
  handleClick = async (conversation) => {
    await this.props.setActiveChat(conversation.otherUser.username);
    await this.messageRead();
  };

  clickChatWhereNotSender = () =>
    this.props.conversation.messages[
      this.props.conversation.messages.length - 1
    ].senderId !== this.props.user.id;

  messageRead = async () => {
    if (this.clickChatWhereNotSender()) {
      await updateReadStatus(
        this.props.conversation.messages[
          this.props.conversation.messages.length - 1
        ].id,
        this.props.conversation.id,
      );
      console.log('Not the sender');
    } else {
      console.log('You are the sender of this message');
    }
  };

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent
          conversation={this.props.conversation}
          user={this.props.user}
        />
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
