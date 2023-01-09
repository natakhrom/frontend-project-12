import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';

import { useSocket } from '../../socket/socket';
import { selectCurrentChannel } from '../../slices/components/channelsSlice';

const Rename = ({ onHide }) => {
  const { t } = useTranslation();
  const notify = () => toast.success(t('notify.renaming'));
  const inputRef = useRef();
  const refSubmit = useRef();
  const refCancel = useRef();
  const socket = useSocket();
  const { rename } = socket;
  const currentChannel = useSelector(selectCurrentChannel);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const schema = yup.object().shape({
    channelName: yup
      .string()
      .required(t('errors.required'))
      .min(3, t('errors.minMax'))
      .max(20, t('errors.minMax')),
  });

  const onSubmit = (values) => {
    try {
      rename(currentChannel.id, values.channelName);
      refSubmit.current.setAttribute('disabled', true);
      refCancel.current.setAttribute('disabled', true);
      onHide();
      notify();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <Formik
      initialValues={{
        channelName: currentChannel.name,
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
      }) => (
        <Form
          onSubmit={handleSubmit}
        >
          <Form.Group
            controlId="channelName"
          >
            <Form.Control
              type="text"
              name="channelName"
              onChange={handleChange}
              ref={inputRef}
              value={values.channelName}
              isInvalid={touched.channelName && errors.channelName}
            />
            <Form.Label className="visually-hidden">{t('fields.channelName')}</Form.Label>
            <Form.Control.Feedback className="invalid-feedback">
              {errors.channelName}
            </Form.Control.Feedback>
          </Form.Group>

          <Modal.Footer className="border-0 p-0">
            <Button type="button" variant="secondary" className="mt-2" onClick={console.log('click')} ref={refCancel}>
              {t('buttons.cancel')}
            </Button>
            <Button type="submit" variant="primary" className="mt-2 me-0" ref={refSubmit}>
              {t('buttons.send')}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
};

export default Rename;
