import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Message from './Message';
import {
  selectCurrentMessages,
} from '../../../../../slices/components/messagesSlice';

const Messages = () => {
  const messages = useSelector(selectCurrentMessages);
  const messagesRef = useRef();

  useEffect(() => {
    if (messages.length) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messagesRef, messages]);

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
