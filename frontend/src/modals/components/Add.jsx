import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';

import { useApi } from '../../api/api';
import { useAuth } from '../../components/common/AuthProvider';

const Add = ({ onHide }) => {
  const { t } = useTranslation();
  const notify = () => toast.success(t('notify.adding'));
  const inputRef = useRef();
  const refSubmit = useRef();
  const refCancel = useRef();
  const { add } = useApi();
  const auth = useAuth();
  const { user } = auth.loggedIn;
  const { username } = user;
  const nameField = '';

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const schema = yup.object().shape({
    channelName: yup
      .string()
      .required('errors.required')
      .min(3, 'errors.minMax')
      .max(20, 'errors.minMax'),
  });

  const onSubmit = (values, reject) => {
    try {
      inputRef.current.readOnly = true;
      refSubmit.current.disabled = true;
      refCancel.current.disabled = true;
      add(values.channelName, username);
      onHide();
      notify();
    } catch (err) {
      reject(err.response.data);
    }
  };

  return (
    <Formik
      initialValues={{
        channelName: nameField,
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
              {t(errors.channelName)}
            </Form.Control.Feedback>
          </Form.Group>

          <Modal.Footer className="border-0 p-0">
            <Button type="button" variant="secondary" className="mt-2" onClick={onHide} ref={refCancel}>
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

export default Add;
