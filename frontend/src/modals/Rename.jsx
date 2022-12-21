import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import socket from '../socket/socket';
import useChannel from '../hooks/useChannel';
import Container from './Container';
import FormModal from './FormModal';

const Rename = ({ show, onHide }) => {
  const currentChannel = useChannel();
  const { t } = useTranslation();
  const notify = () => toast.success(t('notify.renaming'));
  const refSubmit = useRef();
  const refCancel = useRef();

  const onSubmit = (values) => {
    try {
      socket.on('connect', () => console.log(socket.connected));
      socket.emit('renameChannel', {
        id: currentChannel.id,
        name: values.channelName,
      }, (response) => console.log(response.status));

      refSubmit.current.setAttribute('disabled', true);
      refCancel.current.setAttribute('disabled', true);
      onHide();
      notify();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <Container
      show={show}
      onHide={onHide}
      titles={t('titles.renameChannel')}
    >
      <FormModal
        nameField={currentChannel.name}
        onSubmit={onSubmit}
        onHide={onHide}
        refSubmit={refSubmit}
        refCancel={refCancel}
      />
    </Container>
  );
};

export default Rename;
