import HeaderChat from './component/HeaderChat';
import Messages from './component/Messages';
import ChatMessageForm from './component/ChatMessageForm';

const Chat = () => (
  <div className="col p-0 h-100">
    <div className="d-flex flex-column h-100">
      <HeaderChat />
      <Messages />
      <ChatMessageForm />
    </div>
  </div>
);

export default Chat;
