import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Message from './Message';
import {
  selectCurrentMessages,
  lastCurrentMessage,
} from '../../../../../slices/components/messagesSlice';
import { useAuth } from '../../../../common/AuthProvider';

const Messages = () => {
  const messages = useSelector(selectCurrentMessages);
  const messagesRef = useRef();
  const [autoScrollDown, setAutoScrollDown] = useState(true);
  const [lastMessage] = useSelector(lastCurrentMessage);
  const auth = useAuth();
  const { user } = auth.loggedIn;

  useEffect(() => {
    if (autoScrollDown) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  });

  useEffect(() => {
    if (lastMessage && lastMessage.username === user.username) {
      setAutoScrollDown(true);
    }
  }, [lastMessage, user]);

  window.onwheel = (e) => {
    if (e.isTrusted) {
      setAutoScrollDown(false);
    }
  };

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messagesRef}>
      {messages
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
