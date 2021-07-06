import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: theme.spacing(2.5),
    flexGrow: 1,
  },
  username: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: theme.palette.primary.previewText,
    letterSpacing: -0.17,
  },
  unreadPreviewText: {
    fontSize: 12,
    letterSpacing: -0.17,
    fontWeight: '900',
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: theme.palette.primary.background,
    marginRight: theme.spacing(2.5),
    color: 'white',
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation, user } = props;
  const { latestMessageText, otherUser, messages } = conversation;
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = messages.filter(
      (msg) => msg.readStatus === false && msg.senderId !== user.id,
    ).length;

    setUnreadCount(count);
  }, [messages, user.id]);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={unreadCount > 0 ? classes.unreadPreviewText : classes.previewText }>
          {latestMessageText}
        </Typography>
      </Box>
      {unreadCount > 0 && (
      <Box className={classes.notification}>
          {unreadCount}
      </Box>)}
    </Box>
  );
};

export default ChatContent;
