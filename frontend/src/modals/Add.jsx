import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import socket from '../socket/socket';
import Container from './Container';
import FormModal from './FormModal';

const Add = ({ show, onHide }) => {
  const { t } = useTranslation();
  const notify = () => toast.success(t('notify.adding'));
  const refSubmit = useRef();
  const refCancel = useRef();
  const nameField = '';

  const onSubmit = (values) => {
    try {
      socket.on('connect', () => console.log(socket.connected));
      socket.emit(
        'newChannel',
        { name: values.channelName },
        (response) => console.log(response.status),
      );

      refSubmit.current.setAttribute('disabled', true);
      refCancel.current.setAttribute('disabled', true);
      console.log(refCancel.current);
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
      titles={t('titles.addChannel')}
    >
      <FormModal
        nameField={nameField}
        onSubmit={onSubmit}
        onHide={onHide}
        refSubmit={refSubmit}
        refCancel={refCancel}
        labelName={t('fields.labelAddlName')}
      />
    </Container>
  );
};

export default Add;
