import { useSelector } from 'react-redux';

import Message from './Message';
import {
  selectCurrentMessages,
} from '../../../../../slices/components/messagesSlice';

const Messages = () => {
  const messages = useSelector(selectCurrentMessages);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
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
