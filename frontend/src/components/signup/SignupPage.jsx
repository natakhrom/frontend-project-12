import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import routes from '../../routes/routes';
import { useAuth } from '../common/AuthProvider';
import img from '../../images/avatar.jpg';
import goTo from '../../routes/goTo';

const SignupPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const usernameRef = useRef();
  const navigation = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const schema = yup.object().shape({
    username: yup
      .string()
      .required('errors.required')
      .min(3, 'errors.minMax')
      .max(20, 'errors.minMax'),
    password: yup
      .string()
      .required('errors.required')
      .min(6, 'errors.password'),
    confirmPassword: yup
      .string()
      .required('errors.confirmPassword')
      .oneOf([yup.ref('password'), null], 'errors.confirmPassword'),
  });

  const onSubmit = async (values, { setSubmitting }, reject) => {
    setAuthFailed(false);

    try {
      setSubmitting(true);
      const res = await axios.post(routes.signupPath(), values);
      auth.logIn(res.data);
      navigation(goTo.home);
    } catch (err) {
      setSubmitting(false);
      setAuthFailed(true);

      if (err.isAxiosError && err.response.data.statusCode === 409) {
        usernameRef.current.select();

        return;
      }
      reject(err.response.data);
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={img} className="fluid rounded-circle w-100 h-auto" alt="Регистрация" />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={schema}
                onSubmit={onSubmit}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  errors,
                  isSubmitting,
                }) => (
                  <Form
                    className="w-50"
                    onSubmit={handleSubmit}
                  >
                    <h1 className="text-center mb-4">
                      {t('titles.registration')}
                    </h1>

                    <Form.Group
                      controlId="username"
                      className="form-floating mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder={t('fields.username')}
                        name="username"
                        required
                        value={values.username}
                        onChange={(e) => {
                          handleChange(e);
                          if (usernameRef.current.value === '') {
                            setAuthFailed(false);
                          }
                        }}
                        onBlur={handleBlur}
                        isValid={touched.username && !errors.username}
                        isInvalid={(touched.username && !!errors.username) || authFailed === true}
                        ref={usernameRef}
                        disabled={isSubmitting}
                      />
                      <Form.Label>{t('fields.username')}</Form.Label>
                      <Form.Control.Feedback
                        type="invalid"
                        tooltip
                      >
                        {t(errors.username)}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      controlId="password"
                      className="form-floating mb-4"
                    >
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder={t('fields.password')}
                        required
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.password && !errors.password}
                        isInvalid={(touched.password && !!errors.password) || authFailed === true}
                        disabled={isSubmitting}
                      />
                      <Form.Label>{t('fields.password')}</Form.Label>
                      <Form.Control.Feedback
                        type="invalid"
                        tooltip
                      >
                        {t(errors.password)}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      controlId="confirmPassword"
                      className="form-floating mb-4"
                    >
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder={t('fields.confirmPassword')}
                        value={values.confirmPassword}
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.confirmPassword && !errors.confirmPassword
                        }
                        isInvalid={
                          (touched.confirmPassword && !!errors.confirmPassword)
                          || authFailed === true
                        }
                        disabled={isSubmitting}
                      />
                      {authFailed
                        ? (
                          <div className="invalid-tooltip">
                            {t('errors.nameExist')}
                          </div>
                        )
                        : null}
                      <Form.Label>{t('fields.confirmPassword')}</Form.Label>
                      <Form.Control.Feedback
                        type="invalid"
                        tooltip
                      >
                        {t(errors.confirmPassword)}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="outline-primary" type="submit" className="w-100" disabled={isSubmitting}>
                      {t('buttons.signup')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
