import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { useSocket } from '../../socket/socket';
import { selectCurrentChannel } from '../../slices/components/channelsSlice';

const Remove = ({ onHide }) => {
  const { t } = useTranslation();
  const notify = () => toast.success(t('notify.removing'));
  const refSubmit = useRef();
  const refCancel = useRef();
  const socket = useSocket();
  const { remove } = socket;
  const currentChannel = useSelector(selectCurrentChannel);

  const removedClick = () => {
    try {
      remove(currentChannel);
      refSubmit.current.setAttribute('disabled', true);
      refCancel.current.setAttribute('disabled', true);
      onHide();
      notify();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
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
          onClick={() => removedClick()}
        >
          {t('buttons.send')}
        </Button>
      </div>
    </>
  );
};

export default Remove;
