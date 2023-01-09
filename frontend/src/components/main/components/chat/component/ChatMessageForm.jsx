import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useSelector } from 'react-redux';

import { useSocket } from '../../../../../socket/socket';
import { useAuth } from '../../../../common/AuthProvider';
import { selectCurrentChannel } from '../../../../../slices/components/channelsSlice';

const ChatMessageForm = () => {
  const input = React.createRef();
  const currentChannel = useSelector(selectCurrentChannel);
  const socket = useSocket();
  const { setMessage } = socket;

  const auth = useAuth();
  const { user } = auth.loggedIn;
  const { username } = user;

  const { t } = useTranslation();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  useEffect(() => {
    input.current.focus();
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const messageWithoutCens = formData.get('body');
    const message = filter.clean(messageWithoutCens);

    setMessage(message, currentChannel.id, username);
    input.current.value = '';
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={handleSubmit}>
        <Form.Group className="input-group has-validation">
          <Form.Control
            type="text"
            aria-label="Новое сообщение"
            placeholder="Введите новое сообщение..."
            name="body"
            autoComplete="body"
            className="border-0 p-0 ps-2"
            ref={input}
          />
          <Button type="submit" className="btn btn-group-vertical btn-light border-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currwhiteentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">{t('buttons.send')}</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ChatMessageForm;
