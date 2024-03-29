import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import routes from '../../routes/routes';
import { useAuth } from '../common/AuthProvider';
import img from '../../images/hexlet.jpeg';
import goTo from '../../routes/goTo';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const userRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const auth = useAuth();
  const { logIn } = auth;
  const { t } = useTranslation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const onSubmit = async (values, { setSubmitting }, reject) => {
    setAuthFailed(false);

    try {
      setSubmitting(true);
      const res = await axios.post(routes.loginPath(), values);
      logIn(res.data);
      navigate(goTo.home);
    } catch (err) {
      setSubmitting(false);
      setAuthFailed(true);

      if (err.isAxiosError && err.response.status === 401) {
        userRef.current.select();

        return;
      }
      reject(err.response.data);
    }
  };

  const onChange = () => {
    if (userRef.current.value === '' || passwordRef.current.value === '') {
      setAuthFailed(false);
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={img} className="fluid rounded-circle w-100 h-auto" alt="Войти" />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                onSubmit={onSubmit}
                onChange={onChange}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  isSubmitting,
                }) => (
                  <Form
                    className="col-12 col-md-6 mt-3 mt-mb-0"
                    onSubmit={handleSubmit}
                  >
                    <h1 className="text-center mb-4">Войти</h1>
                    <Form.Group
                      controlId="username"
                      className="form-floating mb-3"
                    >
                      <Form.Control
                        type="text"
                        name="username"
                        onChange={(e) => {
                          handleChange(e);
                          if (userRef.current.value === '') {
                            setAuthFailed(false);
                          }
                        }}
                        onBlur={handleBlur}
                        value={values.username}
                        placeholder={t('fields.nickname')}
                        ref={userRef}
                        isInvalid={authFailed}
                        required
                        disabled={isSubmitting}
                      />
                      <Form.Label>{t('fields.nickname')}</Form.Label>
                    </Form.Group>

                    <Form.Group
                      controlId="password"
                      className="form-floating mb-4"
                    >
                      <Form.Control
                        type="password"
                        name="password"
                        onChange={(e) => {
                          handleChange(e);
                          if (passwordRef.current.value === '') {
                            setAuthFailed(false);
                          }
                        }}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder={t('fields.password')}
                        ref={passwordRef}
                        isInvalid={authFailed}
                        required
                        disabled={isSubmitting}
                      />
                      <Form.Label>{t('fields.password')}</Form.Label>
                      {authFailed
                        ? <div className="invalid-tooltip">{t('errors.faildNameOrPassword')}</div>
                        : null}
                    </Form.Group>
                    <Button variant="outline-primary" type="submit" className="w-100" disabled={isSubmitting}>
                      {t('buttons.login')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  {t('questions.account')}
                  {' '}
                </span>
                <a href={goTo.signup}>{t('links.registration')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
