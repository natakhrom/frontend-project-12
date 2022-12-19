import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import useChannel from '../hooks/useChannel';
import socket from '../socket/socket';
import Container from './Container';

const removedClick = (onHide, currentChannel, notify, refSubmit, refCancel) => {
  try {
    socket.on('removeChannel', () => console.log(socket.connected));
    socket.emit('removeChannel', currentChannel, (response) => console.log(response.status));

    refSubmit.current.setAttribute('disabled', true);
    refCancel.current.setAttribute('disabled', true);
    onHide();
    notify();
  } catch (err) {
    console.log(err.response.data);
  }
};

const Remove = ({ show, onHide }) => {
  const currentChannel = useChannel();
  const { t } = useTranslation();
  const notify = () => toast.success(t('notify.removing'));
  const refSubmit = useRef();
  const refCancel = useRef();

  return (
    <Container
      show={show}
      onHide={onHide}
      titles={t('titles.removeChannel')}
    >
      <p className="lead">{t('questions.sure')}</p>
      <div className="d-flex justify-content-end">
        <Button
          type="button"
          className="me-2"
          variant="secondary"
          onClick={onHide}
          ref={refCancel}
        >
          {t('buttons.cancel')}
        </Button>
        <Button
          type="button"
          variant="danger"
          ref={refSubmit}
          onClick={() => removedClick(onHide, currentChannel, notify, refSubmit, refCancel)}
        >
          {t('buttons.send')}
        </Button>
      </div>
    </Container>
  );
};

export default Remove;
