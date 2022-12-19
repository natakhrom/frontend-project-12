import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Messages from './Messages';
import ChatMessageForm from './ChatMassageForm';
import { selectors } from '../slices/messagesSlice';
import useChannel from '../hooks/useChannel';

const Chat = ({ username }) => {
  const currentChannel = useChannel();
  const { t } = useTranslation();
  const messagesLength = useSelector(selectors.selectAll)
    .filter((m) => m.channelId === currentChannel.id)
    .length;
  const countMessages = t('countMessages.key', { count: messagesLength });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {currentChannel.name}
            </b>
          </p>
          <span className="text-muted">{countMessages}</span>
        </div>
        <Messages />
        <ChatMessageForm username={username} />
      </div>
    </div>
  );
};

export default Chat;
