import React from 'react';
import { Box, Typography, Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: '#9CADC8',
    letterSpacing: -0.17,
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: '#3F92FF',
    marginRight: 10,
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

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -180,
    top: 25,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 5px',
  },
}))(Badge);

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <StyledBadge badgeContent={10} color="primary" max={999} showZero>
        <Box>
          <Typography className={classes.username}>
            {otherUser.username}
          </Typography>
          <Typography className={classes.previewText}>
            {latestMessageText}
          </Typography>
        </Box>
      </StyledBadge>
    </Box>
  );
};

export default ChatContent;
