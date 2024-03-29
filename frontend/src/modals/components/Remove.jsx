import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { useApi } from '../../api/api';
import { selectChangeableChannel } from '../../slices/components/channelsSlice';

const Remove = ({ onHide }) => {
  const { t } = useTranslation();
  const notify = () => toast.success(t('notify.removing'));
  const refSubmit = useRef();
  const refCancel = useRef();
  const { remove } = useApi();
  const changeableChannel = useSelector(selectChangeableChannel);

  const removedClick = (reject) => {
    try {
      refSubmit.current.disabled = true;
      refCancel.current.disabled = true;
      remove(changeableChannel);
      onHide();
      notify();
    } catch (err) {
      reject(err.response.data);
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
