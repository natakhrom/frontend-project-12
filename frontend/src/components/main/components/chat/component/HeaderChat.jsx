import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { selectCurrentChannel } from '../../../../../slices/components/channelsSlice';
import { selectCurrentMessages } from '../../../../../slices/components/messagesSlice';

const HeaderChat = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector(selectCurrentChannel);
  const messagesLength = useSelector(selectCurrentMessages).length;
  const countMessages = t('countMessages.key', { count: messagesLength });

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {` ${currentChannel.name}`}
        </b>
      </p>
      <span className="text-muted">{countMessages}</span>
    </div>
  );
};

export default HeaderChat;
