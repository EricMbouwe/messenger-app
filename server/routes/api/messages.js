const router = require('express').Router();
const { Conversation, Message } = require('../../db/models');
const { Op } = require('sequelize');
const onlineUsers = require('../../onlineUsers');

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post('/', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    let conversation = await Conversation.findConversation(
      senderId,
      recipientId,
    );

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId === conversation.id) {
      const message = await Message.create({
        senderId,
        text,
        conversationId,
        readStatus: false,
      });
      return res.json({ message, sender });
    } else if (conversationId !== conversation.id) {
      return res.sendStatus(401);
    }

    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      readStatus: false,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put('/:conversationId', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    // look up the conversation
    const conversation = await Conversation.findOne({
      where: {
        id: req.params.conversationId,
      },
    });

    // if not existing return 404
    if (!conversation) {
      res.status(404).send('The message with the given id was not found');
    }

    // update the conversation's messages
    const messages = await Message.update(
      { readStatus: req.body.readStatus },
      {
        returning: true,
        where: {
          senderId: {
            [Op.not]: req.user.id,
          },
          conversationId: req.params.conversationId,
        },
      },
    );

    res.send(messages[1]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
