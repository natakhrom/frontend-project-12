import { useRef, useEffect } from 'react';
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
  const [lastMessage] = useSelector(lastCurrentMessage);
  const auth = useAuth();
  const { user } = auth.loggedIn;
  const isInitialScroll = useRef(true);

  useEffect(() => {
    if (isInitialScroll || (lastMessage && lastMessage.username === user.username)) {
      isInitialScroll.current = false;

      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [lastMessage, user]);

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
