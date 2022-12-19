import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button } from 'react-bootstrap';

const FormModal = ({
  nameField,
  onSubmit,
  onHide,
  refSubmit,
  refCancel,
}) => {
  const { t } = useTranslation();
  const inputRef = useRef();

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
          <Form.Group>
            <Form.Control
              type="text"
              name="channelName"
              onChange={handleChange}
              ref={inputRef}
              value={values.channelName}
              isInvalid={touched.channelName && errors.channelName}
            />
            <Form.Control.Feedback className="invalid-feedback">
              {errors.channelName}
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

export default FormModal;
