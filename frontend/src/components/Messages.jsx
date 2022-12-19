import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import socket from '../socket/socket';

import Message from './Message';
import {
  selectors,
  actions as messagesActions,
} from '../slices/messagesSlice';
import useChannel from '../hooks/useChannel';

const Messages = () => {
  const dispatch = useDispatch();
  const messages = useSelector(selectors.selectAll);
  const currentChannel = useChannel();

  useEffect(() => {
    socket.on('connect', () => console.log(socket.connected));
    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });
  }, [dispatch]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {messages
        .filter((m) => m.channelId === currentChannel.id)
        .map((m) => (
          <Message
            key={m.id}
            username={m.username}
            text={m.body}
          />
        ))}
    </div>
  );
};

export default Messages;
